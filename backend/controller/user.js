const connection = require("../database/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10).then(
        hash => {
            if (!hash) {
                return res.status(500).json({
                    message: "Erreur lors du hachage"
                })
            }
            connection.query(
                "INSERT INTO user (id, email, password,admin) VALUES (?,?,?,0)",
                [null, req.body.email, hash],
                function (err, results) {
                    if (err) {
                        console.log(err);
                        return res.status(400).json({
                            message: "Veuillez remplir tous les champs du formulaire"
                        })
                    }
                    res.status(201).json({
                        message: "Utilisateur créé.e"
                        //redirect page de connexion "/login"
                    })
                    console.log(results);
                }
            );
        }
    ).catch(
        error => {
            return res.status(500).json({
                message: "Hash bcrypt ne fonctionne pas"
            })
        }
    )

}

exports.getUser = (req, res) => {
    connection.query(
        'SELECT * FROM user WHERE id = ?',
        [req.auth.userId],
        function (err, results) {
            if (err) {
                console.log(err);
                res.status(404).json({
                    message: "Utilisateur introuvable"
                })
            }
            const user = results[0];
            res.status(200).json({
                user: {
                    email: user.email,
                    id :user.id,
                    admin:user.admin
                }
            })
        }
    );
}

exports.login = (req, res) => {
    const { email, password } = req.body
    connection.query(
        'SELECT * FROM user WHERE email = ?',
        [email],
        function (err, results) {
            const user = results[0]
            if (!user) {
                return res.status(404).json({
                    message: "Utilisateur introuvable"
                })
            }
            bcrypt.compare(password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            message: "Mot de passe invalide"
                        })
                    }
                    return res.status(201).json({
                        userId: user.id,
                        token: jwt.sign({ userId: user.id, admin: user.admin }, "RANDOM", { expiresIn: "24h" })
                    })
                }
            ).catch(
                error => {
                    return res.status(500).json({
                        message: "Compare bcrypt ne fonctionne pas"
                    })
                }
            )
        }

    )
}
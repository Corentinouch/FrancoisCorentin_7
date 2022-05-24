const connection = require("../database/db")

exports.signup = (req, res) => {
    connection.query(
        "INSERT INTO user (id, email, password) VALUES (?,?,?)",
        [null, req.body.email, req.body.password],
        function (err, results) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    message:"Veuillez remplir tous les champs du formulaire"
                })
            }
            res.status(201).json({
                message:"Utilisateur créé.e"
            })
            console.log(results);
        }
    );
}

exports.getUser = (req, res) => {
    connection.query(
        'SELECT * FROM user WHERE id = ?',
        [req.params.id],
        function (err, results) {
            if (err) {
                console.log(err);
                res.status(404).json({
                    message:"Utilisateur introuvable"
                })
            }
            res.status(200).json({
                user:results[0]
            })
            console.log(results);
        }
    );
}
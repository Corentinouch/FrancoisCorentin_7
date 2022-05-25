const connection = require("../database/db")



exports.signup = (req, res) => {
    connection.query(
        "INSERT INTO user (id, email, password) VALUES (?,?,?)",
        [null, req.body.email, bcrypt.hash(req.body.password, 10)],
        function (err, results) {
            if (err) {
                console.log(err);
                res.status(400).json({
                    message:"Veuillez remplir tous les champs du formulaire"
                })
            }
            res.status(201).json({
                message:"Utilisateur créé.e"
                //redirect page de connexion "/login"
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
/*
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };*/
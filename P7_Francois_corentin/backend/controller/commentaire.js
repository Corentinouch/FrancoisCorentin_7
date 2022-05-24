const connection = require("../database/db")

exports.getAllCom = (req, res) =>{
    connection.query(
        'SELECT * FROM commentaire WHERE post_id = ?',
        [req.body.post_id],
        function (err, results) {
            if (err) {
                console.log(err);
               return res.status(404).json({
                    message:"Com indisponibles"
                })
            }
            res.status(200).json({
                commentaires:results
            })
            console.log(results);
        }
    )
} 

exports.getOneCom = (req, res) =>{
    connection.query(
        "SELECT * FROM commentaire WHERE id = ?",
        [req.params.id],
        function (err, results) {
            if (err || !results.length) {
                console.log(err);
                return res.status(404).json({
                    message:"Com indisponible"
                })
            }
            res.status(200).json({
                commentaire:results[0]
            })
            console.log(results);
        }
    )
}

exports.createCom = (req, res) => {
    connection.query(
        "INSERT INTO commentaire (id, message, post_id, user_id) VALUES (?,?,?,?)",
        [null, req.body.message, req.body.post_id, req.body.user_id],
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message:"Le commentaire n'a pas pu être créé"
                })
            }
            res.status(201).json({
                message:"Un commentaire a été créé"
            })
            console.log(results);
        }
    );
}

exports.deleteCom = (req, res) => {
    connection.query(
        "DELETE FROM commentaire WHERE id=?",
        [req.params.id],
        function (err, results) {
            if (err || !results.affectedRows) {
                console.log(err);
                return res.status(404).json({
                    message:"Le commentaire n'a pas pus être supprimé"
                })
            }
            res.status(200).json({
                message:"Le commentaire a été supprimé"
            })
            console.log(results);
        }
    );
}
exports.modifyCom = (req, res) => {
    connection.query(
        "UPDATE commentaire SET message = ? WHERE id=?",
        [req.body.message, req.params.id],
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    message:"Le commentaire n'a pas pu être modifié"
                })
            }
            res.status(200).json({
                message:"Le commentaire a été modifié"
            })
            console.log(results);
        }
    );
}
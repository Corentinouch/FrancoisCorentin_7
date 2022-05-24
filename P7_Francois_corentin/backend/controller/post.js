const connection = require("../database/db")

exports.getAllPost = (req, res) =>{
    connection.query(
        'SELECT * FROM post',
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    message:"Post indisponibles"
                })
            }
            res.status(200).json({
                posts:results
            })
            console.log(results);
        }
    )
} 

exports.getOnePost = (req, res) =>{
    connection.query(
        "SELECT * FROM post WHERE id = ?",
        [req.params.id],
        function (err, results) {
            if (err || !results.length) {
                console.log(err);
                return res.status(404).json({
                    message:"Post indisponible"
                })
            }
            
            res.status(200).json({
                post:results[0]
            })
            console.log(results);
        }
    )
}

exports.createPost = (req, res) => {
    connection.query(
        "INSERT INTO post (id, message, imageurl, user_id) VALUES (?,?,?,?)",
        [null, req.body.message, req.body.imageurl, req.body.user_id],
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message:"Le post n'a pas pu être créé"
                })
            }
            res.status(201).json({
                message:"Un post a été créé"
            })
            console.log(results);
        }
    );
}

exports.deletePost = (req, res) => {
    connection.query(
        "DELETE FROM post WHERE id=?",
        [req.params.id],
        function (err, results) {
            if (err || !results.affectedRows) {
                console.log(err);
                return res.status(404).json({
                    message:"Le post n'a pas pus être supprimé"
                })
            }
            res.status(200).json({
                message:"Le post a été supprimé"
            })
            console.log(results);
        }
    );
}
exports.modifyPost = (req, res) => {
    connection.query(
        "UPDATE post SET message = ?, imageurl = ? WHERE id= ?",
        [req.body.message, req.body.imageurl,req.params.id ],
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    message:"Le post n'a pas pu être modifié"
                })
            }
            res.status(200).json({
                message:"Le post a été modifié"
            })
            console.log(results);
        }
    );
}
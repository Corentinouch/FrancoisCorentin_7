const connection = require("../database/db")

exports.getAllPost = (req, res) => {
    connection.query(
        //'SELECT post.id,post.message,post.imageurl,post.likes,post.user_id,user.email FROM post LEFT JOIN user ON user.id = post.user_id',
        "SELECT post.id,post.message,post.imageurl,post.likes,post.user_id,user.email, groupomania.like.user_id AS 'hasLiked' FROM post LEFT JOIN user ON user.id = post.user_id LEFT JOIN groupomania.like ON groupomania.like.user_id = ? AND post.id = groupomania.like.post_id ORDER BY post.id desc",
        [req.auth.userId],
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(404).json({
                    message: "Posts indisponibles"
                })
            }
            res.status(200).json({
                posts: results
            })
            console.log(results);
        }
    )
}

exports.getOnePost = (req, res) => {
    connection.query(
        "SELECT * FROM post WHERE id = ?",
        [req.params.id],
        function (err, posts) {
            if (err || !posts.length) {
                console.log(err);
                return res.status(404).json({
                    message: "Post indisponible"
                })
            }
            connection.query(
                "select * from groupomania.like where post_id = ?",
                [req.params.id],
                function (err, likes) {
                    if (err) {
                        return res.status(404).json({
                            message: "Like indisponible"
                        })
                    }
                    res.status(200).json({
                        post: { ...posts[0], likes: likes.length }
                    })
                }
            )
        }
    )
}

exports.createPost = (req, res) => {
    console.log(req.file);
    const imageurl = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename
    connection.query(
        "INSERT INTO post (id, message, imageurl, user_id, likes) VALUES (?,?,?,?,0)",
        [null, req.body.message, imageurl, req.auth.userId],
        function (err, results) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: "Le post n'a pas pu être créé"
                })
            }
            res.status(201).json({
                message: "Un post a été créé"
            })
            console.log(results);
        }
    );
}

exports.deletePost = (req, res) => {
    connection.query(
        "SELECT * FROM post WHERE id = ?",
        [req.params.id],
        function (err, posts) {
            if (err || !posts.length) {
                return res.status(404).json({
                    message: "Le post est introuvable"
                })
            }
            const post = posts[0];
            if (post.user_id === req.auth.userId || req.auth.admin) {
                connection.query(
                    "DELETE FROM post WHERE id=?",
                    [req.params.id],
                    function (err, results) {
                        if (err || !results.affectedRows) {
                            console.log(err);
                            return res.status(404).json({
                                message: "Le post n'a pas pus être supprimé"
                            })
                        }
                        res.status(200).json({
                            message: "Le post a été supprimé"
                        })
                        console.log(results);
                    }
                );
            } else {
                return res.status(401).json({
                    message: "Acces interdit"
                })
            }
        }
    )
}
exports.modifyPost = (req, res) => {
    connection.query(
        "SELECT * FROM post WHERE id = ?",
        [req.params.id],
        function (err, posts) {
            if (err || !posts.length) {
                return res.status(404).json({
                    message: "Le post est introuvable"
                })
            }
            const post = posts[0];
            if (post.user_id === req.auth.userId || req.auth.admin) {

                const imageurl = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename
                connection.query(
                    "UPDATE post SET message = ?, imageurl = ? WHERE id= ?",
                    [req.body.message, imageurl, req.params.id],
                    function (err, results) {
                        if (err) {
                            console.log(err);
                            return res.status(404).json({
                                message: "Le post n'a pas pu être modifié"
                            })
                        }
                        res.status(200).json({
                            message: "Le post a été modifié"
                        })
                        console.log(results);
                    }
                );
            } else {
                return res.status(401).json({
                    message: "Acces interdit"
                })
            }
        }
    )
}

exports.likePost = (req, res) => {
    connection.query(
        "SELECT * FROM groupomania.like WHERE user_id = ? AND post_id = ?",
        [req.auth.userId, req.params.id],
        function (err, results) {
            console.log(results)
            if (results && results.length && results[0]) {
                connection.query(
                    "DELETE FROM groupomania.like WHERE user_id = ? AND post_id = ?",
                    [req.auth.userId, req.params.id],
                    function (err, results) {
                        if (err) {
                            console.log(err);
                            return res.status(404).json({
                                message: "Error Like"
                            })
                        }
                        connection.query(
                            "UPDATE post SET likes = likes - 1 WHERE id = ?",
                            [req.params.id],
                            function (err, results) {

                            }
                        )
                        res.status(200).json({
                            message: "Vous avez dislikez le post"
                        })
                        console.log(results);
                    }
                )
            } else {
                connection.query(
                    "INSERT INTO groupomania.like SET user_id = ? , post_id = ?",
                    [req.auth.userId, parseInt(req.params.id)],
                    function (err, results) {
                        if (err) {
                            console.log(err);
                            return res.status(404).json({
                                message: "Error Like"
                            })
                        }
                        connection.query(
                            "UPDATE post SET likes = likes + 1 WHERE id = ?",
                            [req.params.id],
                            function (err, results) {

                            }
                        )
                        res.status(200).json({
                            message: "Vous avez likez le post"
                        })
                        console.log(results);
                    }
                )
            }

        }
    )
}

exports.hasLike = (req, res) => {
    connection.query(
        "SELECT * FROM groupomania.like WHERE user_id = ? AND post_id = ?",
        [req.auth.userId, req.params.id],
        function (err, results) {
            if (err || !results.length) {
                return res.status(404).json(false)
            }
            return res.status(200).json(true)
        })
}
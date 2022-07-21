import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import axios from "axios"
import Layout from "../components/static/Layout"
import { NavLink, useNavigate } from 'react-router-dom'
import "../styles/forum.css"
import emptyHeart from "../images/empty_heart.png"
import fullHeart from "../images/full_heart.png"

const Forum = () => {

    const { register, handleSubmit, reset } = useForm();
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState()
    const [haslike, sethaslike] = useState(false)

    useEffect(() => {

        getPosts();

        axios.get(process.env.REACT_APP_API + "/auth")
            .then((result) => {
                setUser(result.data.user)
                console.log(result.data.user)
            })
            .catch((error) => console.log(error))

    }, [])


    const getPosts = () => {
        axios.get(process.env.REACT_APP_API + "/post")
            .then((result) => {
                const posts = result.data.posts;
                setPosts(posts)
            })
            .catch((error) => console.log(error))
    }
    console.log(posts)

    const deletePost = (postId) => {
        axios.delete(process.env.REACT_APP_API + "/post/" + postId)
            .then((result) => {
                getPosts();
            })
            .catch((error) => console.log(error))
    }

    const onSubmit = (data) => {
        const formdata = new FormData();
        formdata.append("message", data.message)
        formdata.append("image", data.image[0])
        axios.post(process.env.REACT_APP_API + "/post", formdata)
            .then((result) => {
                getPosts();
                reset();
            })
            .catch((error) => console.log(error))

    }
    const addLike = (postId) => {
        axios.post(process.env.REACT_APP_API + "/post/" + postId).then(() => {
            getPosts()
        })

    }

    return (
        <Layout>
            <h1>Bienvenue chez Groupomania </h1>

            {posts.map((post) => {
                console.log(post.hasLiked)
                return (
                    <div className="posts" id={post.id}>
                        <div className="post_bk">
                            {post.imageurl ? <img src={post.imageurl} alt="post img" /> : null}
                            <div className="msgandlike">
                                <p className="message">{post.message}</p>
                                <div className="like_bk">
                                    <div className="like">
                                        <div className="btn_like" onClick={() => addLike(post.id)}>
                                            {post.hasLiked ? <img src={fullHeart} alt="coeur" /> : <img src={emptyHeart} alt="coeur" />}


                                        </div>
                                        <p>{post.likes}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {user && (post.user_id === user.id || user.admin) ?
                            (
                                <div className="btn_gpe">
                                    <button><NavLink to={"/post/" + post.id}>Modifier</NavLink></button>
                                    <button onClick={() => deletePost(post.id)}>
                                        Supprimer
                                    </button>
                                </div>
                            ) : null
                        }


                    </div>
                )
            })}

            <form className="form_bk" onSubmit={handleSubmit(onSubmit)}>
                <div className="modif_form">
                    <label>Créer votre post ici:</label>
                    <div className="input_form">
                        <input {...register('message')} type="text" placeholder="Rédiger votre message ici..." required />
                        <input type="file" {...register('image')} required />
                    </div>
                </div>
                <div className="form_btn">
                    <button>Envoyer</button>
                </div>
            </form>
        </Layout>
    )

}

export default Forum
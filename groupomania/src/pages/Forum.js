import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import axios from "axios"
import Layout from "../components/static/Layout"
import { NavLink, useNavigate } from 'react-router-dom'
import "../styles/forum.css"

const Forum = () => {

    const { register, handleSubmit, reset } = useForm();
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState()

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
                setPosts(result.data.posts)

            })
            .catch((error) => console.log(error))
    }

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
            <h1>Forum</h1>

            {posts.map((post) => (
                <div className="posts" id={post.id}>
                    {post.imageurl ? <img src={post.imageurl} alt="post img" /> : null}
                    <p>{post.message}</p>
                    <div className="like">
                        <div className="separate"></div>
                        <button className="btn_like" onClick={() => addLike(post.id)}>👍</button>
                        <p>{post.likes}</p>
                        
                    </div>
                    
                    {user && ( post.user_id === user.id || user.admin )? 
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
            ))}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Message</label>
                    <input {...register('message')} type="text" placeholder="Message" required />
                    <input type="file" {...register('image')} required />
                </div>
                <div className="form_btn">
                    <button>Envoyer</button>
                </div>
                <div>
                    "Msg erreur"
                </div>
            </form>
        </Layout>
    )

}

export default Forum
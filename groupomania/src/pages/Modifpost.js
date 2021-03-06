import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import axios from "axios"
import Layout from "../components/static/Layout"
import { NavLink, useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom"
import "../styles/forum.css"

const Modifpost = () => {
    const { register, handleSubmit, reset } = useForm();
    const [post, setPosts] = useState({})
    const params = useParams()

    useEffect(() => {

        getPosts();

    }, [])

    const getPosts = () => {
        axios.get(process.env.REACT_APP_API + "/post/" + params.postId)
            .then((result) => {
                setPosts(result.data.post)

            })
            .catch((error) => console.log(error))
    }

    const onSubmit = (data) => {
        const formdata = new FormData();

        formdata.append("message", data.message)
        formdata.append("image", data.image[0])
        axios.put(process.env.REACT_APP_API + "/post/" + params.postId, formdata)
            .then((result) => {
                getPosts();
                reset();
            })
            .catch(error => console.log("error"))
        console.log(data.image[0])
        console.log(data)
    };

    return (
        <Layout>
            <div className="modif_title">
                <h1>Modification du post</h1>
                <NavLink to={"/"}>Retour au forum</NavLink>
            </div>

            <div className="posts" id={post.id}>
                {post.imageurl ? <img src={post.imageurl} alt="post img" /> : null}
                <p className="message">{post.message}</p>
            </div>



            <form className="form_bk" onSubmit={handleSubmit(onSubmit)}>
                <div className="modif_form">
                    <div> Mofidier votre post ici</div>
                    <div className="input_form">
                        <input {...register('message')} type="text" placeholder="Message" required />
                        <input type="file" {...register('image')} />
                    </div>
                </div>
                <div className="form_btn">
                    <button>Envoyer</button>
                </div>
            </form>
        </Layout>
    )
}

export default Modifpost;
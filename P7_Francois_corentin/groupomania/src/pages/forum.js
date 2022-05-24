import { useState, useEffect } from "react"
import axios from "axios"
import Layout from "../components/static/layout"

const Forum = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {

        axios.get("http://localhost:3001/post")
        .then((result) => {
            setPosts(result.data.posts)
        })
        .catch((error) => console.log(error))

    }, [])

    return(
        <Layout>
            
            <h1>Forum</h1>

            {posts.map((post) => (
                <div>
                    {post.imageurl ? <img src={post.imageurl} alt="post img" /> : null}
                    <p>{post.message}</p>
                </div>
            ))}

        </Layout>
    )

}

export default Forum
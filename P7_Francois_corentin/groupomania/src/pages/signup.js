import Layout from "../components/static/layout"
import { useForm } from "react-hook-form"
import axios from "axios"

const Signup = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data)
        .then((result) => {
            console.log(result)
        })
        .catch(error => console.log(error))
    }; 

return (
    <Layout>
        <h1>Signup</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label>Email</label>
                <input {...register('email')} type="text" />
            </div>
            <div>
                <label>Password</label>
                <input {...register('password')} type="text" /> 
            </div>

            <button>Signup</button>

        </form>
    </Layout>
)

}

export default Signup
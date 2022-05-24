import Layout_login from "../components/static/layout_login"
import { useForm } from "react-hook-form"
import axios from "axios"

const Login = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data)
        .then((result) => {
            console.log(result)
        })
        .catch(error => console.log(error))
    }; 

return (
    <Layout_login>
        <h1>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

            <div>
                <label>Email</label>
                <input {...register('email')} type="text" />
            </div>
            <div>
                <label>Password</label>
                <input {...register('password')} type="text" /> 
            </div>

            <button>Login</button>

        </form>
    </Layout_login>
)

}

export default Login
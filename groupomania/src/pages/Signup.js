import { useForm } from "react-hook-form"
import axios from "axios"
import Layout_login from "../components/static/Layout_login"
import {NavLink, useNavigate} from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        axios.post(process.env.REACT_APP_API + "/auth/signup", data)
            .then((result) => {
                axios.post(process.env.REACT_APP_API + "/auth/login", data)
                .then((result) => {
                    localStorage.token = result.data.token
                    axios.defaults.headers.common.Authorization = "Bearer " + result.data.token
                    navigate("/")
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    };

    return (
        <Layout_login>
            <div>
                <h1>Inscription</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input {...register('email')} type="text" placeholder="E-mail" />
                    </div>
                    <div>
                        <label>Mot de passe</label>
                        <input {...register('password')} type="text" placeholder="Mot de passe" />
                    </div>
                    <div className="form_btn">
                        <button>S'inscrire</button>
                        <NavLink to="/login">Se connecter</NavLink>
                    </div>
                </form>
            </div>
        </Layout_login>
    )

}

export default Signup
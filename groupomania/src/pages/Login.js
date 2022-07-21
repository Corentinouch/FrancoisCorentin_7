import { useForm } from "react-hook-form"
import axios from "axios"
import Layoutlogin from "../components/static/Layoutlogin"
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        axios.post(process.env.REACT_APP_API + "/auth/login", data)
            .then((result) => {
                localStorage.token = result.data.token
                axios.defaults.headers.common.Authorization = "Bearer " + result.data.token
                navigate("/")
            })
            .catch(error => console.log(error)).then(() => {
                const message = document.getElementById("msg")
                message.innerHTML = "Le mot de passe est incorrect"
            }
            )

    };

    return (
        <Layoutlogin>
            <div>
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input {...register('email')} type="text" placeholder="E-mail" required />
                    </div>
                    <div>
                        <label>Mot de passe</label>
                        <input {...register('password')} type="password" placeholder="Mot de passe" required />
                    </div>
                    <div id="msg" className="error"></div>
                    <div className="form_btn">

                        <button>Se connecter</button>
                        <NavLink to="/signup">S'inscrire</NavLink>
                    </div>
                </form>
            </div>
        </Layoutlogin>
    )

}

export default Login
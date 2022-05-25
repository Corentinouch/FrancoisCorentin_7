import { useForm } from "react-hook-form"
import axios from "axios"
import Layout_login from "../components/static/Layout_login"

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
                        <a href="/">Déjà un compte ?</a>
                        </div>
                </form>
            </div>
        </Layout_login>
    )

}

export default Signup
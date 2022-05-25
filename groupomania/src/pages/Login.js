import { useForm } from "react-hook-form"
import axios from "axios"
import Layout_login from "../components/static/Layout_login"

const Login = () => {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data)
            .then((result) => {
                console.log(result)
            })
            .catch(error => console.log(error))
    };
 
    function handleClick(e){
        /*let status_msg = document.querySelector(".login div form");
        if(){
        status_msg.innerHTML += `<div>connexion ok</div>`;
        }else{
        status_msg.innerHTML += `<div>connexion KO</div>`;
        }*/
        console.log("test",e);
    }

    return (
        <Layout_login>
            <div>
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input {...register('email')} type="text" placeholder="E-mail" required/>
                    </div>
                    <div>
                        <label>Mot de passe</label>
                        <input {...register('password')} type="text" placeholder="Mot de passe" required/>
                    </div>
                    <div className="form_btn">
                        <button onClick={handleClick}>Se connecter</button>
                        <a href="/signup">S'inscrire</a>
                    </div>
                </form>
            </div>
        </Layout_login>
    )

}

export default Login
import Header from "./Header"
import '../../styles/login.css'
import logo from "../../images/groupomania_red.png"

const Layoutlogin = ({ children }) => {

    return(
        <>
            <Header>
                <img src={logo} alt="logo groupomania"/>
            </Header>

            <main className="login">

                {children}

            </main>
        </>
    )

}

export default Layoutlogin
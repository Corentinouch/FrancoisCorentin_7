import Header from "./Header"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import logo from "../../images/groupomania_red.png"

const Layout = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.token) {
            navigate("/login")
        }
    }, [])

    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }
    console.log(__dirname);
    return (
        <>
        
            <Header>
            <img src={logo} alt="logo groupomania"/>
                <div className="disconnect">
                    <a onClick={logout}>Déconnexion</a>
                </div>
            </Header>

            <main>

                {children}

            </main>

            <Footer />

        </>
    )

}

export default Layout
import Header from "./Header"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

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
    return (
        <>
        
            <Header>
                <h1>Groupomania</h1>
                <div className="disconnect">
                    <a onClick={logout}>Deconnexion</a>
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
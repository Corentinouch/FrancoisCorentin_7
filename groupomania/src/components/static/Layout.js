import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children }) => {

    return (
        <>

            <Header>
                <h1>Groupomania</h1>
                <div className="disconnect">
                    <a href="/">Deconnexion</a>
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
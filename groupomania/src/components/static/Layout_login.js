import Header from "./Header"
import Footer from "./Footer"
import '../../styles/login.css'

const Layout_login = ({ children }) => {

    return(
        <>
            <Header>
                <h1>Groupomania</h1>
            </Header>

            <main className="login">

                {children}

            </main>

            <Footer />
        </>
    )

}

export default Layout_login
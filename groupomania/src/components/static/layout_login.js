import Header_login from "./header_login"

const Layout = ({ children }) => {

    return(
        <>
        
            <Header_login />

            <main>

                {children}

            </main>

            <footer>
                Copyright 2022 - Blabla
            </footer>
        
        </>
    )

}

export default Layout
import Header from "./header"

const Layout = ({ children }) => {

    return(
        <>
        
            <Header />

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
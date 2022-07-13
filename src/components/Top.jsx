function Top(){

    return(
        <main >
                <header>
                    <h2>Top Page</h2>
                </header>
                <section className="container" >
                    <a className="white-btn register-btn" href="/signup">
                        <img src="./assets/img/icon_signup.png" alt="" />
                        <span>Sign up</span>
                    </a>
                    <a className="yellow-btn register-btn" href="/signin">
                        <img src="./assets/img/icon_signin.png" alt="" />
                        <span>Sign in</span>
                    </a>
                </section>
            </main>
    )
}

export default Top;
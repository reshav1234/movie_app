import './navBar.css'
import logo from '../Assets/logo.jpg'

const NavBar = () => {
  return (
    <>
        <div className = "navbar">
            <div className = "navbar-container">
                <div className = "navbar-logo">
                    <img src = {logo} alt = "logo" />
                </div>
                <div className = "navbar-links">
                    <a href = "#">Home</a>
                    <a href = "#">Concert</a>
                    <a href = "#">Movies</a>
                    <a href = "#">Threater Events</a>
                </div>
                <div className = "button">
                    <a>Login</a>
                    <button>Register</button>
                </div>
            </div>
        </div>
    </>
  )

}

export default NavBar
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Nav() {
    return(
        <nav>
            <Link to="/">
            Home
            </Link>
            {Auth.loggedIn()?(
                <>
                <Link to="/dashboard">
                Dashboard
                </Link>
                <a href='#' onClick={(e) => {
                    e.preventDefault();
                    Auth.logout();
                } }>Log Out</a>
                </>
            ) : (
                <>
                <Link to="/signup">
                SignUp
                </Link>
    
                <Link to="/login">
                Login
                </Link>
                </>
            )}
        </nav>
    )
}

export default Nav;
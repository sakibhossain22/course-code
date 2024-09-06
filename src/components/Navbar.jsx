import { Link, NavLink } from 'react-router-dom';
import logo from '../../src/assets/logo.png'
import { useContext } from 'react';
import { AuthContext } from './AuthProvider/AuthProvider';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <div>
            <div className="navbar">
                <div className="flex-1">
                    <img className='w-10 bg-white rounded-full' src={logo} alt="logo" />
                    <Link to={'/'} className="btn btn-ghost text-white text-xl font-bold">Course <span>Code</span></Link>
                </div>
                <div className="flex-none gap-2">
                    <div className='flex items-center justify-center gap-4 text-white font-semibold'>
                        {
                            user && <NavLink to={'/dashboard'}>Dashboard</NavLink>

                        }
                        <NavLink to={'/login'}>Login</NavLink>
                        <NavLink to={'/register'}>Register</NavLink>
                    </div>
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    <div>
                       {
                        user && <button onClick={logOut} className='bg-purple-700 text-white px-5 py-2 rounded font-bold'>Log Out</button>
                       }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const {user, logOut}=useContext(AuthContext)
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');    
    const navigate = useNavigate();

    useEffect(() => {
        const routeName = location.pathname.replace('/', '');
        const formattedRouteName = routeName.charAt(0).toUpperCase() + routeName.slice(1);
        document.title = `uniPlanet | ${formattedRouteName}`;
      }, [location]);
    // console.log(user)

    const handleSearch = () => {
        fetch (`${import.meta.env.VITE_API_URL}/searchToysByText/${searchQuery}`)
        .then(res=>res.json())
        .then(data=>
            console.log(data),
            // setSearchQuery(data),
            navigate(`/college?search=${searchQuery}`)
        )
    };

    const handleLogout=()=>{
        logOut()
        .then(()=>{})
        .catch(error=>{
            console.log(error.message)
        })
    }

    const navOptions = <>
        <li className='mx-1 my-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/">Home</NavLink></li>
        <li className='mx-1 my-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/college">Colleges</NavLink></li>
        <li className='mx-1 my-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/admission'>Admission</NavLink></li>
        {
            user ? 
            <li className='mx-1 my-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/myCollege">my colleges</NavLink></li> :             
            <li className='mx-1 my-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to='/signup'>Sign up</NavLink></li>
        }
        {user?
        <li onClick={handleLogout} className='mx-1 my-2'><a href="">Log Out</a></li>:
        <li className='mx-1 my-2'><NavLink className={({ isActive }) => (isActive ? 'active' : 'default')} to="/login">Login</NavLink></li>
        }
    </>

    return (
        <div className='container mx-auto navbar bg-base-100'>
            <div className="navbar-start md:w-[400px] w-[100px]">
                <Link to='./' className="">
                    <img className='w-20' src='https://i.ibb.co/xCRV32n/IMG-20230725-002727.jpg' alt="" />
                </Link>
            </div>
            <div className="navbar-center ">
                <div className="dropdown">
                    <label tabIndex={0} className="btn my-btn lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-30">
                        {navOptions}
                    </ul>
                </div>
                <div className='hidden lg:flex'>
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
            </div>
            <div className="navbar-end">
                <div onClick={() => navigate(`/profile/${user?.email}`)}>
                    {
                        user ? 
                            <div className='mr-2 tooltip tooltip-bottom tooltip-warning ' data-tip={user.displayName}>
                                {
                                    user?.photoURL ? <img className='border-1 border-red-400 rounded-full w-10' src={user.photoURL} alt="" />:
                                    <p>{user?.displayName}</p>
                                }
                                
                        </div> : 
                        <div className=''>
                            <FaUserCircle className="mr-2 text-4xl text-primary"></FaUserCircle>
                        </div>

                    }
                </div>
                <div className="form-control">
                    <div className="input-group ">
                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search by College name" 
                        className="input input-bordered md:w-full w-[80px]" />
                        <button onClick={handleSearch} className="md:w-[50px] w-[20px] btn btn-square bg-primary text-black hover:bg-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;
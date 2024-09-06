import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../src/assets/logo.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider/AuthProvider';

const Navbar = () => {
    const [courses, setCourses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        // Fetch the courses when the component mounts
        fetch('http://localhost:5000/course')
            .then(res => res.json())
            .then(data => {
                setCourses(data);
            });
    }, []);

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        // Filter courses based on the search term
        const filtered = courses.filter(course =>
            course.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Implement any additional actions on form submit if needed
    };
    const handleSearch = (id) => {
        navigate(`/course/${id}`)
        setSearchTerm('')
    }
    return (
        <div>
            <div className="navbar bg-purple-700 p-4 flex flex-col md:flex-row items-center">
                <div className="flex-1 flex items-center">
                    <img className="w-10 bg-white rounded-full" src={logo} alt="logo" />
                    <Link to={'/'} className="btn btn-ghost text-white text-xl font-bold ml-2">Course</Link>
                </div>
                <div className="flex-none w-full md:w-auto mt-4 md:mt-0">
                    <div className="flex items-center justify-center gap-4 text-white font-semibold">
                        {user && <NavLink to={'/dashboard'}>Dashboard</NavLink>}
                        <NavLink to={'/login'}>Login</NavLink>
                        <NavLink to={'/register'}>Register</NavLink>
                    </div>
                </div>
                <div className="flex-none mx-1 w-full md:w-auto mt-4 md:mt-0">
                    <div className="form-control w-full">
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                placeholder="Search"
                                className="input input-bordered w-full md:w-64"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </form>
                    </div>
                </div>
                <div className="mt-4 md:mt-0">
                    {user && <button onClick={logOut} className='bg-blue-600 text-white px-5 py-2 rounded font-bold'>Log Out</button>}
                </div>
            </div>

            {/* Display filtered courses below the search bar */}
            {searchTerm && (
                <div className="bg-white absolute h-96 overflow-y-scroll z-10 w-1/2 top-16 right-0 mt-2 p-4 rounded shadow-lg">
                    <h3 className="text-lg font-bold mb-2">Search Results:</h3>
                    <div className="">
                        {filteredCourses.map(course => (
                            <div onClick={()=>handleSearch(course.id)} key={course.id} className="flex hover:bg-gray-300 duration-300 border my-1 p-2 text-black  gap-2">
                                <img src={course.thumbnail} alt={course.name} className="w-14 h-14 object-cover rounded mb-2" />
                                <div>
                                    <h4 className="text-xl font-semibold">{course.name}</h4>
                                    <p className="text-sm">Instructor: {course.instructor}</p>
                                </div>
                            </div>
                        ))}
                        {filteredCourses.length === 0 && <p>No courses found.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;

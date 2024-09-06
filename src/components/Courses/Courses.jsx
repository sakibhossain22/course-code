import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
    const [courses, setCourses] = useState([]); // State to hold the list of courses
    const [cart, setCart] = useState([]); // State to hold the courses added to the cart

    useEffect(() => {
        // Fetch the courses from the API when the component mounts
        fetch('http://localhost:5000/course')
            .then(res => res.json())
            .then(data => {
                setCourses(data); // Update the state with the fetched data
            });
    }, []);

    const addToCart = (course) => {
        setCart([...cart, course]); // Add the selected course to the cart
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-6">Available Courses</h1>
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white text-gray-800 p-6 rounded-lg shadow-lg h-96 flex flex-col">
                            <img src={course.thumbnail} alt={course.name} className="w-full h-40 object-cover rounded-md mb-4" />
                            <h2 className="text-lg font-semibold mb-2">{course.name.slice(0, 30) + '...'}</h2>
                            <p className="mb-4 flex-grow">{course.description.slice(0, 40) + '...'}</p>
                            <p className="mb-4 font-medium">Instructor: {course.instructor}</p>
                            <div className="mt-auto  flex items-center justify-between">
                                <Link to={`/course/${course.id}`} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2">View Details</Link>
                                <button
                                    onClick={() => addToCart(course)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
        </div>
    );
};

export default Courses;

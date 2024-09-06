import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const CourseDetails = () => {
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const [course, setCourse] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [syllabusOpen, setSyllabusOpen] = useState(false); 

    useEffect(() => {
        fetch('http://localhost:5000/course')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch course data');
                }
                return res.json();
            })
            .then(data => {
                const singleCourse = data.find(c => c.id.toString() === id);
                setCourse(singleCourse); 
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false); 
            });
    }, [id]);

    if (loading) {
        return <div className="text-center text-white">Loading course details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!course) {
        return <div className="text-center text-white">Course not found</div>;
    }

    const toggleSyllabus = () => {
        setSyllabusOpen(!syllabusOpen)
    };
    const addToCart = () => {
        if (course) {
            fetch('http://localhost:5000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({course, email : user?.email}),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to add course to cart');
                })
                .then(data => {
                    alert(`${course.name} added to cart!`);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen text-white">
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <img
                    src={course.thumbnail}
                    alt={course.name}
                    className="w-full h-60 object-cover rounded-md mb-4"
                />
                <h2 className="text-3xl font-bold mb-4">{course.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <p className="font-medium">Instructor: {course.instructor}</p>
                    <p>
                        Enrollment Status:
                        <span className={
                            course.enrollmentStatus === 'Open'
                                ? 'text-green-500 font-semibold'
                                : 'text-red-500 font-semibold'
                        }>
                            {course.enrollmentStatus}
                        </span>
                    </p>
                    <p>Duration: {course.duration}</p>
                    <p>Schedule: {course.schedule}</p>
                    <p>Location: {course.location}</p>
                    <p>Pre-requisites: {course.prerequisites.join(", ")}</p>
                </div>
                <div className="mt-4">
                    <button
                        onClick={toggleSyllabus}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {syllabusOpen ? 'Hide Syllabus' : 'Show Syllabus'}
                    </button>
                    {syllabusOpen && (
                        <div className="mt-4 p-4 bg-gray-100 text-gray-800 rounded-lg shadow-inner">
                            <h3 className="text-xl font-semibold mb-2">Syllabus</h3>
                            <ul className="list-disc pl-5">
                                {course.syllabus && course.syllabus.length > 0 ? (
                                    course.syllabus.map((item, index) => (
                                        <li key={index} className="mb-2">
                                            <strong>Week {item.week}: {item.topic}</strong>
                                            <p>{item.content}</p>
                                        </li>
                                    ))
                                ) : (
                                    <li>No syllabus available</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <button onClick={addToCart} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Enroll Now
                </button>
            </div>
        </div>
    );
};

export default CourseDetails;

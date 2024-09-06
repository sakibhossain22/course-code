import { useEffect, useState } from "react";

const Dashboard = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        // Fetch the courses the student is enrolled in
        fetch('http://localhost:5000/cart/sakib@gmail.com')
            .then(res => res.json())
            .then(data => {
                setEnrolledCourses(data); // Update state with the enrolled courses
            });
    }, []);

    const markAsCompleted = (courseId) => {
        // Implement the logic to mark a course as completed
        fetch(`http://localhost:5000/cart/markCompleted`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseId }),
        })
        .then(response => {
            if (response.ok) {
                setEnrolledCourses(prevCourses => prevCourses.map(enrollment => 
                    enrollment.course.id === courseId 
                        ? { ...enrollment, completed: true } 
                        : enrollment
                ));
            } else {
                alert('Failed to mark course as completed.');
            }
        });
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold mb-8">My Courses</h1>
            {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map(enrollment => (
                        <div key={enrollment.course.id} className="bg-white p-6 rounded-lg shadow-md">
                            <img 
                                src={enrollment.course.thumbnail} 
                                alt={enrollment.course.name} 
                                className="w-full h-40 object-cover rounded-md mb-4" 
                            />
                            <h2 className="text-2xl font-bold mb-2">{enrollment.course.name}</h2>
                            <p className="text-gray-600 mb-2">Instructor: {enrollment.course.instructor}</p>
                            <p className="text-gray-600 mb-2">Due Date: {enrollment.dueDate}</p>
                            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden mb-4">
                                <div 
                                    className="bg-green-500 h-full" 
                                    style={{ width: `${enrollment.progress}%` }}
                                ></div>
                            </div>
                            <button 
                                onClick={() => markAsCompleted(enrollment.course.id)} 
                                disabled={enrollment.completed}
                                className={`px-4 py-2 ${enrollment.completed ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded hover:bg-blue-600`}
                            >
                                {enrollment.completed ? 'Completed' : 'Mark as Completed'}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading courses...</p>
            )}
        </div>
    );
};

export default Dashboard;

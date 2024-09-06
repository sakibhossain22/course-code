import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Link} from "react-router-dom";

const Banner = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/course')
            .then(res => res.json())
            .then(data => {
                setCourses(data);
            });
    }, []);

    const settings = {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        modules: [Pagination, Navigation],
    };

    return (
        <div className="flex flex-col md:flex-row my-10 items-center gap-10 p-5 py-14 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 rounded-lg shadow-xl">
            <div className="md:w-2/6 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl text-white font-extrabold leading-tight mb-4">
                    E - Learning
                </h1>
                <p className="text-xl text-gray-200 font-medium mb-2">
                    Online Courses
                </p>
                <p className="text-lg text-gray-300 mb-6">
                    Get 25% Discount Now! Don't miss out on our limited-time offer.
                </p>
                <Link
                    to={'/courses'}
                    className="inline-block bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 text-lg font-bold rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                    All Course
                </Link>
            </div>
            <div className="md:w-4/6">
                <Swiper {...settings} className="pb-10">
                    {courses.map(course => (
                        <Link to={`/course/${course.id}`} key={course.id}>
                            <SwiperSlide>
                                <div className="mx-auto bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform ">
                                    <img src={course.thumbnail} alt={course.name} className="w-full h-40 object-cover" />
                                    <div className="h-14 mx-2">
                                        <h1 className="text-base font-semibold text-gray-800">{course.name}</h1>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Link>
                    ))}
                    <div className="swiper-button-next text-white"></div>
                    <div className="swiper-button-prev text-white"></div>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;

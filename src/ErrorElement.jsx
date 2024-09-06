import { NavLink } from "react-router-dom";

const ErrorElement = () => {
    return (
        <div className="flex flex-col gap-10 items-center justify-center h-screen">
            <h1 className="text-red-600 text-4xl font-bold text-center">404</h1>
            <NavLink to={'/'}>
                <button className="btn btn-success">Home</button>
            </NavLink>
        </div>
    );
};

export default ErrorElement;
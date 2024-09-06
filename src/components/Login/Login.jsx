import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginWithEmail } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        // Basic form validation (optional)
        if (!email || !password) {
            console.error("Please fill in both fields");
            return;
        }

        try {
            await loginWithEmail(email, password);
            console.log("Login successful");
            window.location = '/dashboard'
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    return (
        <div
            style={{ height: "calc(100vh - 100px)" }}
            className="flex rounded-lg bg-opacity-35 items-center justify-center bg-gray-100"
        >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl text-black font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-bold text-black mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            defaultValue={'sakib@gmail.com'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                            placeholder="Type Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-black font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            defaultValue={'sakib1234'}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 text-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                            placeholder="Type Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

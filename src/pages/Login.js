import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
                "https://codesphere-backend-production-2d28.up.railway.app/api/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
    "user",
    JSON.stringify(
        response.data.user
    )
);

            toast.success("Login Successful 🚀");

            setLoading(false);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            setLoading(false);

            toast.error("Login Failed");
        }
    };

    return (

        <div className="min-h-screen flex">

            {/* LEFT SIDE */}

            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-purple-700 to-black justify-center items-center p-16">

                <div>

                    <h1 className="text-6xl font-extrabold text-white leading-tight">
                        Welcome to
                        <br />
                        CodeSphere 🚀
                    </h1>

                    <p className="text-gray-300 text-xl mt-6 max-w-lg">
                        A modern developer platform where you can
                        create, manage, and share amazing posts
                        with a beautiful experience.
                    </p>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="w-full lg:w-1/2 bg-black flex justify-center items-center px-6">

                <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-gray-700 rounded-3xl p-10 shadow-2xl">

                    <h1 className="text-4xl font-bold text-white text-center mb-2">
                        Login
                    </h1>

                    <p className="text-gray-400 text-center mb-8">
                        Welcome back 👋
                    </p>

                    <form onSubmit={handleLogin}>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="w-full bg-gray-900 text-white border border-gray-700 p-4 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="w-full bg-gray-900 text-white border border-gray-700 p-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl text-lg font-bold hover:scale-105 transition duration-300 shadow-lg"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>

                    </form>

                    <p className="text-center text-gray-400 mt-8">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="text-blue-400 font-semibold ml-2 hover:text-purple-400 transition"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;
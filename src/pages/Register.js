import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await axios.post(
                "https://codesphere-backend-production-2d28.up.railway.app/api/auth/register",
                {
                    name,
                    email,
                    password,
                    role,
                    bio,
                    github,
                    linkedin,
                    profileImage
                }
            );

            toast.success("Registration Successful 🚀");

            navigate("/");

        } catch (error) {

            console.log(error);

            toast.error("Registration Failed");
        }

        setLoading(false);
    };

    return (

        <div className="min-h-screen bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 flex justify-center items-center p-6">

            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl">

                <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
                    Create Your Profile 🚀
                </h1>

                <form onSubmit={handleRegister}>

                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-lg mb-4"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-lg mb-4"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-lg mb-4"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Role (Developer, Designer...)"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-lg mb-4"
                    />

                    <textarea
                        placeholder="Tell us about yourself..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows="4"
                        className="w-full border border-gray-300 p-4 rounded-lg mb-4"
                    />

                    <input
                        type="text"
                        placeholder="GitHub Profile URL"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-lg mb-4"
                    />

                    <input
                        type="text"
                        placeholder="LinkedIn Profile URL"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-lg mb-4"
                    />

                    <input
                        type="text"
                        placeholder="Profile Image URL"
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                        className="w-full border border-gray-300 p-4 rounded-lg mb-6"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
                    >
                        {loading ? "Creating Profile..." : "Register"}
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Already have an account?

                    <Link
                        to="/"
                        className="text-purple-600 font-semibold ml-2"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;
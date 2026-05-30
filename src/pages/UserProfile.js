import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

function UserProfile() {

    const { id } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {

        fetchUser();

    }, []);

    const fetchUser = async () => {

        try {

            const response = await axios.get(
                `https://codesphere-backend-production-2d28.up.railway.app/api/auth/user/${id}`
            );

            setUser(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    if (!user) {

        return (
            <div className="text-white text-center mt-20">
                Loading...
            </div>
        );
    }

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 p-10">

                <div className="max-w-4xl mx-auto">

                    <div className="bg-white/10 backdrop-blur-xl border border-gray-700 rounded-3xl p-10">

                        {/* PROFILE HEADER */}

                        <div className="flex flex-col md:flex-row items-center gap-8">

                            <img
                                src={
                                    user.profileImage
                                        ? user.profileImage
                                        : `https://ui-avatars.com/api/?name=${user.name}`
                                }
                                alt="profile"
                                className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover"
                            />

                            <div>

                                <h1 className="text-5xl font-bold text-white">
                                    {user.name}
                                </h1>

                                <p className="text-blue-400 mt-3 text-xl">
                                    {user.role || "Developer"}
                                </p>

                                <p className="text-gray-400 mt-2">
                                    {user.email}
                                </p>

                            </div>

                        </div>

                        {/* ABOUT */}

                        <div className="mt-10">

                            <h2 className="text-3xl font-bold text-white mb-4">
                                About Me
                            </h2>

                            <p className="text-gray-300 text-lg leading-relaxed">
                                {user.bio || "No bio added yet."}
                            </p>

                        </div>

                        {/* SOCIAL LINKS */}

                        <div className="mt-10 flex gap-4 flex-wrap">

                            {user.github && (
                                <a
                                    href={user.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                                >
                                    GitHub
                                </a>
                            )}

                            {user.linkedin && (
                                <a
                                    href={user.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                                >
                                    LinkedIn
                                </a>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default UserProfile;
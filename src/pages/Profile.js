import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
    fetchMyPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    const fetchMyPosts = async () => {

        try {

            const response =
                await axios.get(
                    `https://codesphere-backend-production-2d28.up.railway.app/api/posts/user/${user.id}`
                );

            setMyPosts(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 p-10">

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white/10 backdrop-blur-xl border border-gray-700 rounded-3xl p-10 shadow-2xl">

                        {/* PROFILE HEADER */}

                        <div className="flex flex-col md:flex-row items-center gap-8">

                            <img
                                src={
                                    user?.profileImage
                                        ? user.profileImage
                                        : `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=0D8ABC&color=fff&size=256`
                                }
                                alt="profile"
                                className="w-44 h-44 rounded-full border-4 border-blue-500 object-cover"
                            />

                            <div>

    <h1 className="text-5xl font-extrabold text-white">
        {user?.name}
    </h1>

    <p className="text-xl text-blue-400 mt-3">
        {user?.role || "Developer"}
    </p>

    <p className="text-gray-400 mt-2">
        {user?.email}
    </p>

    <button
        onClick={() =>
            window.location.href = "/edit-profile"
        }
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
    >
        Edit Profile
    </button>

</div>

                        </div>

                        {/* BIO */}

                        <div className="mt-10 bg-black/30 border border-gray-700 rounded-2xl p-8">

                            <h2 className="text-3xl font-bold text-white mb-4">
                                About Me
                            </h2>

                            <p className="text-gray-300 text-lg leading-relaxed">
                                {
                                    user?.bio ||
                                    "No bio added yet."
                                }
                            </p>

                        </div>

                        {/* SOCIAL LINKS */}

                        <div className="mt-10 flex flex-wrap gap-5">

                            {
                                user?.github && (

                                    <a
                                        href={user.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold"
                                    >
                                        GitHub
                                    </a>
                                )
                            }

                            {
                                user?.linkedin && (

                                    <a
                                        href={user.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                                    >
                                        LinkedIn
                                    </a>
                                )
                            }

                        </div>

                        {/* MY POSTS */}

                        <div className="mt-12">

                            <h2 className="text-3xl font-bold text-white mb-6">
                                My Posts 📝
                            </h2>

                            {
                                myPosts.length === 0 ? (

                                    <div className="bg-black/30 border border-gray-700 rounded-2xl p-6">

                                        <p className="text-gray-400">
                                            No Posts Yet 🚀
                                        </p>

                                    </div>

                                ) : (

                                    myPosts.map((post) => (

                                        <div
                                            key={post.id}
                                            className="bg-black/30 border border-gray-700 rounded-2xl p-6 mb-4"
                                        >

                                            <h3 className="text-xl font-bold text-white">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-400 mt-2">
                                                {post.content}
                                            </p>

                                            <p className="text-pink-400 mt-3">
                                                ❤️ {post.likes}
                                            </p>

                                        </div>
                                    ))
                                )
                            }

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Profile;
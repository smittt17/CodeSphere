import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function EditProfile() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        role: user?.role || "",
        bio: user?.bio || "",
        github: user?.github || "",
        linkedin: user?.linkedin || "",
        profileImage: user?.profileImage || ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // Upload profile image first

            if (file) {

                const imageData = new FormData();

                imageData.append("file", file);
                imageData.append("userId", user.id);

                const imageResponse = await axios.post(
                    "http://localhost:8080/api/upload/profile-image",
                    imageData
                );

                formData.profileImage =
                    imageResponse.data;
            }

            const response = await axios.put(
                `http://localhost:8080/api/auth/user/${user.id}`,
                formData
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            toast.success(
                "Profile Updated Successfully 🚀",
                {
                    position: "top-right",
                    autoClose: 2000
                }
            );

            setTimeout(() => {

                window.location.href =
                    "/profile";

            }, 2000);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed To Update Profile ❌",
                {
                    position: "top-right",
                    autoClose: 2000
                }
            );
        }
    };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-blue-950 flex items-center justify-center px-4 py-10">

                <div className="w-full max-w-3xl">

                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10">

                        <div className="text-center mb-8">

                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold mb-4">

                                {
                                    formData.profileImage
                                        ? (
                                            <img
                                                src={formData.profileImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        )
                                        : (
                                            user?.name?.charAt(0)
                                        )
                                }

                            </div>

                            <h1 className="text-4xl font-extrabold text-white">
                                Edit Profile ✨
                            </h1>

                            <p className="text-gray-400 mt-2">
                                Update your developer profile
                            </p>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>

                                <label className="block text-gray-300 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value
                                        })
                                    }
                                    className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-cyan-500"
                                />

                            </div>

                            <div>

                                <label className="block text-gray-300 mb-2">
                                    Role
                                </label>

                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            role: e.target.value
                                        })
                                    }
                                    className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-cyan-500"
                                />

                            </div>

                            <div>

                                <label className="block text-gray-300 mb-2">
                                    Bio
                                </label>

                                <textarea
                                    rows="5"
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bio: e.target.value
                                        })
                                    }
                                    className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-cyan-500"
                                />

                            </div>

                            <div>

                                <label className="block text-gray-300 mb-2">
                                    GitHub Profile
                                </label>

                                <input
                                    type="text"
                                    value={formData.github}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            github: e.target.value
                                        })
                                    }
                                    className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-cyan-500"
                                />

                            </div>

                            <div>

                                <label className="block text-gray-300 mb-2">
                                    LinkedIn Profile
                                </label>

                                <input
                                    type="text"
                                    value={formData.linkedin}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            linkedin: e.target.value
                                        })
                                    }
                                    className="w-full p-4 rounded-xl bg-black/30 border border-gray-700 text-white focus:outline-none focus:border-cyan-500"
                                />

                            </div>

                            <div>

                                <label className="block text-gray-300 mb-2">
                                    Profile Image
                                </label>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setFile(
                                            e.target.files[0]
                                        )
                                    }
                                    className="w-full p-3 rounded-xl bg-black/30 border border-gray-700 text-white"
                                />

                            </div>

                            <button
                                type="submit"
                                className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-lg hover:scale-105 transition duration-300 shadow-lg"
                            >
                                🚀 Save Profile
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </>

    );
}

export default EditProfile;
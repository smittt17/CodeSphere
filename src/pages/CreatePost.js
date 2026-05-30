import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function CreatePost() {

    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [image, setImage] = useState(null);

    const [preview, setPreview] = useState("");

    const handleImageChange = (e) => {

        const file = e.target.files[0];

        setImage(file);

        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            // FORM DATA

            const user = JSON.parse(
    localStorage.getItem("user")
);

const formData = new FormData();

formData.append("title", title);

formData.append("content", content);

if (image) {

    formData.append(
        "image",
        image
    );
}

formData.append(
    "authorId",
    user.id
);

formData.append(
    "authorName",
    user.name
);

formData.append(
    "authorImage",
    user.profileImage || ""
);

            await axios.post(
                "http://localhost:8080/api/posts",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success("Post Created Successfully 🚀");

            setTitle("");

            setContent("");

            setImage(null);

            setPreview("");

        } catch (error) {

            console.log(error);

            toast.error("Failed to Create Post");
        }
    };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-black flex justify-center items-center p-10">

                <div className="bg-gradient-to-br from-gray-900 to-blue-950 p-10 rounded-3xl shadow-2xl w-full max-w-3xl border border-gray-800">

                    <h1 className="text-5xl font-extrabold text-center text-white mb-10">
                        Create New Post 🚀
                    </h1>

                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            placeholder="Enter Post Title"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            className="w-full bg-gray-900 text-white border border-gray-700 p-5 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <textarea
                            placeholder="Write amazing content..."
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)
                            }
                            rows="6"
                            className="w-full bg-gray-900 text-white border border-gray-700 p-5 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />

                        {/* IMAGE INPUT */}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-white mb-6"
                        />

                        {/* IMAGE PREVIEW */}

                        {
                            preview && (

                                <img
                                    src={preview}
                                    alt="preview"
                                    className="w-full h-[350px] object-cover rounded-2xl mb-6"
                                />
                            )
                        }

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl text-xl font-bold hover:scale-[1.02] transition duration-300"
                        >
                            Create Post
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}

export default CreatePost;
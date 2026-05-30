import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Dashboard() {

    const [posts, setPosts] = useState([]);

    const [editingPost, setEditingPost] = useState(null);

    const [updatedTitle, setUpdatedTitle] = useState("");

    const [updatedContent, setUpdatedContent] = useState("");

    const [updating, setUpdating] = useState(false);

    const [comments, setComments] = useState({});

    const [newComment, setNewComment] = useState({});

    const [search, setSearch] = useState("");
    const currentUser = JSON.parse(
    localStorage.getItem("user")
);

    useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
}, []);

    // FETCH POSTS

    const fetchPosts = async () => {

        try {

            const response = await axios.get(
                "https://codesphere-backend-production-2d28.up.railway.app/api/posts"
            );

            setPosts(response.data);

            // FETCH COMMENTS

            response.data.forEach((post) => {

                fetchComments(post.id);

            });

        } catch (error) {

            console.log(error);

            toast.error("Failed to Load Posts");
        }
    };

    // FETCH COMMENTS

    const fetchComments = async (postId) => {

        try {

            const response = await axios.get(
                `https://codesphere-backend-production-2d28.up.railway.app/api/comments/${postId}`
            );

            setComments((prev) => ({
                ...prev,
                [postId]: response.data
            }));

        } catch (error) {

            console.log(error);
        }
    };

    // LIKE POST

    const likePost = async (id) => {

    try {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        await axios.put(
            `https://codesphere-backend-production-2d28.up.railway.app/api/posts/${id}/like?userId=${user.id}`
        );

        fetchPosts();

    } catch (error) {

        console.log(error);

        toast.error("Failed to Like Post");
    }
};

    // ADD COMMENT

    const addComment = async (postId) => {

        if (!newComment[postId]?.trim()) return;

        try {

            await axios.post(
                "https://codesphere-backend-production-2d28.up.railway.app/api/comments",
                {
                    postId,
                    text: newComment[postId]
                }
            );

            setNewComment((prev) => ({
                ...prev,
                [postId]: ""
            }));

            fetchComments(postId);

            toast.success("Comment Added ");

        } catch (error) {

            console.log(error);

            toast.error("Failed to Add Comment");
        }
    };

    // DELETE POST

    const deletePost = async (id) => {

        try {

            localStorage.getItem("token");

            const user = JSON.parse(
    localStorage.getItem("user")
);


await axios.delete(
    `https://codesphere-backend-production-2d28.up.railway.app/api/posts/${id}?userId=${user.id}`
);

            toast.success("Post Deleted Successfully");

            fetchPosts();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");
        }
    };

    // EDIT POST

    const editPost = (post) => {

        setEditingPost(post.id);

        setUpdatedTitle(post.title);

        setUpdatedContent(post.content);
    };

    // UPDATE POST

    const updatePost = async (id) => {

        try {

            const token = localStorage.getItem("token");

            setUpdating(true);

            const user = JSON.parse(
    localStorage.getItem("user")
);


await axios.put(
    `https://codesphere-backend-production-2d28.up.railway.app/api/posts/${id}?userId=${user.id}`,
                {
                    title: updatedTitle,
                    content: updatedContent
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Post Updated Successfully");

            setUpdating(false);

            setEditingPost(null);

            fetchPosts();

        } catch (error) {

            console.log(error);

            setUpdating(false);

            toast.error("Update Failed");
        }
    };

    // SEARCH FILTER

    const filteredPosts = posts.filter((post) =>

        post.title.toLowerCase().includes(
            search.toLowerCase()
        ) ||

        post.content.toLowerCase().includes(
            search.toLowerCase()
        )
    );

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 p-10">

                <h1 className="text-5xl font-extrabold text-white mb-3">
                    Welcome to Dashboard
                </h1>

                <p className="text-gray-400 mb-10 text-lg">
                    Explore all amazing posts from CodeSphere
                </p>

                {/* SEARCH BAR */}

                <div className="mb-10">

                    <input
                        type="text"
                        placeholder="🔍 Search posts..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="w-full bg-white/10 backdrop-blur-lg border border-gray-700 text-white p-5 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                </div>

                {
                    filteredPosts.length === 0 ? (

                        <div className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-3xl p-10 text-center">

                            <h2 className="text-3xl font-bold text-white mb-4">
                                No Posts Found
                            </h2>

                            <p className="text-gray-400">
                                Try searching something else
                            </p>

                        </div>

                    ) : (

                        filteredPosts.map((post) => (

                            <div
                                key={post.id}
                                className="bg-white/10 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl overflow-hidden mb-10 hover:scale-[1.01] transition duration-300"
                            >

                                {/* IMAGE */}

                                {
                                    post.imageUrl && (

                                        <img
                                            src={post.imageUrl}
                                            alt="post"
                                            className="w-full h-[450px] object-cover"
                                        />
                                    )
                                }

                                {/* CONTENT */}

                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">

    <img
        src={
            post.authorImage
                ? post.authorImage
                : `https://ui-avatars.com/api/?name=${post.authorName}`
        }
        alt="author"
        className="w-10 h-10 rounded-full border border-blue-500"
    />

    <Link
        to={`/user/${post.authorId}`}
        className="text-blue-400 font-semibold hover:underline"
    >
        {post.authorName}
    </Link>

</div>
                                    <h2 className="text-3xl font-bold text-white">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-300 mt-4 text-lg leading-relaxed">
                                        {post.content}
                                    </p>

                                    {/* BUTTONS */}

                                    <div className="mt-6 flex gap-4 flex-wrap">

    <button
        onClick={() => likePost(post.id)}
        className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
    >
        ❤️ {post.likes || 0}
    </button>

    {currentUser?.id === post.authorId && (
        <>
            <button
                onClick={() => deletePost(post.id)}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
            >
                Delete
            </button>

            <button
                onClick={() => editPost(post)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300"
            >
                Edit
            </button>
        </>
    )}

</div>

                                    {/* COMMENTS */}

                                    <div className="mt-10">

                                        <h3 className="text-2xl font-bold text-white mb-5">
                                            Comments 💬
                                        </h3>

                                        {/* COMMENT INPUT */}

                                        <div className="flex gap-3 mb-5">

                                            <input
                                                type="text"
                                                placeholder="Write a comment..."
                                                value={newComment[post.id] || ""}
                                                onChange={(e) =>
                                                    setNewComment((prev) => ({
                                                        ...prev,
                                                        [post.id]: e.target.value
                                                    }))
                                                }
                                                className="flex-1 bg-gray-900 text-white border border-gray-700 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />

                                            <button
                                                onClick={() => addComment(post.id)}
                                                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 rounded-xl font-semibold hover:scale-105 transition duration-300"
                                            >
                                                Post
                                            </button>

                                        </div>

                                        {/* COMMENT LIST */}

                                        {
                                            comments[post.id]?.map((comment) => (

                                                <div
                                                    key={comment.id}
                                                    className="bg-black/30 border border-gray-700 rounded-2xl p-4 mb-3"
                                                >

                                                    <p className="text-gray-300">
                                                        {comment.text}
                                                    </p>

                                                </div>
                                            ))
                                        }

                                    </div>

                                    {/* EDIT FORM */}

                                    {
                                        editingPost === post.id && (

                                            <div className="mt-8 bg-black/30 rounded-2xl p-6 border border-gray-700">

                                                <input
                                                    type="text"
                                                    value={updatedTitle}
                                                    onChange={(e) =>
                                                        setUpdatedTitle(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full bg-gray-900 text-white border border-gray-700 p-4 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />

                                                <textarea
                                                    value={updatedContent}
                                                    onChange={(e) =>
                                                        setUpdatedContent(
                                                            e.target.value
                                                        )
                                                    }
                                                    rows="5"
                                                    className="w-full bg-gray-900 text-white border border-gray-700 p-4 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                />

                                                <button
                                                    onClick={() =>
                                                        updatePost(post.id)
                                                    }
                                                    disabled={updating}
                                                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition duration-300"
                                                >
                                                    {
                                                        updating
                                                            ? "Saving..."
                                                            : "Save Changes"
                                                    }
                                                </button>

                                            </div>
                                        )
                                    }

                                </div>

                            </div>
                        ))
                    )
                }

            </div>
        </>
    );
}

export default Dashboard;
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-black/30 border-b border-gray-700 shadow-lg">

            <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    CodeSphere 🚀
                </h1>

                <div className="flex items-center gap-6">

                    <Link
                        to="/dashboard"
                        className="text-white hover:text-blue-400 transition font-medium"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/create-post"
                        className="text-white hover:text-purple-400 transition font-medium"
                    >
                        Create Post
                    </Link>

                    <Link
    to="/profile"
    className="text-white hover:text-pink-400 transition font-medium"
>
    Profile
</Link>

                    <button
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2 rounded-xl text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
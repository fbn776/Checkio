import {useState} from "react"
import {useNavigate} from "react-router";
import {toast} from "sonner";
import {loginService} from "@/services/auth-service.js";

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setIsLoading(true)

        try {
            //await loginService(username, password);
            navigate("/");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex-1 p-8">
                <div className="max-w-md mx-auto bg-white rounded-md shadow-sm p-8">
                    <h2 className="text-xl font-semibold mb-6">Login to Checkio</h2>

                    {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium mb-1">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0099e5]"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0099e5]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#0099e5] text-white py-2 px-4 rounded-md hover:bg-[#0088cc] focus:outline-none focus:ring-2 focus:ring-[#0099e5] focus:ring-offset-2 transition-colors"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


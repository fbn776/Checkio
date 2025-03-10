import axios from "axios";
import {AUTH_TOKEN_KEY} from "@/lib/data.js";
import {toast} from "sonner";


export async function loginService(username, password) {
    const response = await axios.post("/api/auth/login", {
        username,
        password,
    });

    // Insert the token into the local storage
    if (response.data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
    }
    toast.success("Login successful");
}

export async function logoutService() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    toast.success("Logout successful");
    window.location.replace("/login");
}
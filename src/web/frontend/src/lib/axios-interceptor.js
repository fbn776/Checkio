import axios from "axios";
import {AUTH_TOKEN_KEY} from "@/lib/data.js";

/**
 * This function sets up the Axios interceptors for the application.
 *
 * i.e... take the token from localStorage and add it to the Authorization header.
 *
 * @constructor
 */
function AuthTokenSetup() {
    axios.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(AUTH_TOKEN_KEY);
            if (token) {
                config.headers["Authorization"] = "Bearer " + token;
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            if (error.response.status === 401) {
                localStorage.removeItem(AUTH_TOKEN_KEY);
                if (window.location.pathname !== "/login") {
                    window.location.replace("/login");
                }
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );
}

export default AuthTokenSetup;
import {useEffect} from "react";
import axios from "axios";


/**
 * This hook gets called when the user goes to the home page.
 * It sends a request to the server to test the token. If the token is invalid then the server returns a 401 (Unauthorized) status code.
 *
 * If the token is invalid, the user is redirected to the login page.
 */
export default function useTestToken() {
    useEffect(() => {
        axios.get('/api/auth/test-token').catch(e => {
            console.error(e);
            window.location.replace("/login");
        })
    }, []);
}
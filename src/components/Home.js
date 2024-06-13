import "../public/static/css/base.css"
import axios from "axios";
import {access_token_cookie, backend_socket, USER_FOUND} from "../util/constants";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const access_token = Cookies.get(access_token_cookie);
    const navigate = useNavigate();
    if (access_token) {
        axios.get(`${backend_socket}/auth/check/token/${access_token}`)
            .then(response => {
                return response.data
            })
            .then(data => {
                if (data.responseMsg === USER_FOUND) {
                    navigate("/chats");
                } else {
                    navigate("/auth")
                }
            }).catch(error => {
            console.error(`Error:${error}`);
        });
    } else {
        navigate("/auth")
    }


};
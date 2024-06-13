import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './public/static/css/base.css';
import Home from "./components/Home"
import Auth from "./components/Auth"
import OTP from "./components/OTP"
import Chatter from "./components/Chatter"
import CompleteProfile from "./components/CompleteProfile";


function App() {

    useEffect(() => {
        const loadScripts = () => {
            const jquery = document.createElement('script');
            jquery.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
            jquery.crossOrigin = 'anonymous';
            jquery.onload = () => {
                const popper = document.createElement('script');
                popper.src = 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';
                popper.crossOrigin = 'anonymous';
                popper.onload = () => {
                    const bootstrap_js = document.createElement('script');
                    bootstrap_js.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';
                    bootstrap_js.crossOrigin = 'anonymous';
                    bootstrap_js.onload = () => {
                        // All scripts are loaded, you can render your application
                    };
                    document.body.appendChild(bootstrap_js);
                };
                document.body.appendChild(popper);
            };
            document.body.appendChild(jquery);
        };

        // Load scripts dynamically
        loadScripts();
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/otp" element={<OTP/>}/>
                <Route path="/complete-profile" element={<CompleteProfile/>}/>
                <Route path="/chats" element={<Chatter/>}/>
            </Routes>
        </Router>

    )
}

export default App;
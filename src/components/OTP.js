import {Navigate, useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {
    access_token_cookie, backend_socket, EDIT_PHONE_NUMBER, SIGN_IN, SIGN_UP, USER_NOT_FOUND
} from "../util/constants";
import axios from "axios";
import {useState} from "react";

export default function OTP() {
    const location = useLocation();
    const access_token = Cookies.get(access_token_cookie);
    const navigate = useNavigate();
    if (!location.state) {
        return <div className="alert alert-danger text-center"> DIRECT ACCESS IS NOT ALLOWED ! </div>;
    }
    let pg_src = location.state.pg_src;
    let phone_number = location.state.phone_number;
    if (pg_src === EDIT_PHONE_NUMBER) {
        if (access_token) {
            axios.get(`${backend_socket}/auth/check/token/${access_token}`)
                .then(response => {
                    return response.data
                })
                .then(data => {
                    if (data.responseMsg === USER_NOT_FOUND) {
                        navigate("/auth")
                    }
                });
        } else {
            navigate("/auth")
        }
    }
    return <OtpForm phone_number={phone_number} pg_src={pg_src}/>;
};

function OtpForm({phone_number, pg_src}) {

    const [otpcode, setOtpCode] = useState(['', '', '', '', '', '']);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVisible, setAlertVisible] = useState(false);
    let navigate = useNavigate();
    if (!isCodeSent) {
        console.log("Entered!")
        send_otp_code(phone_number)
        setIsCodeSent(true)
    }

    function onInputOtpTxt(event, index) {
        if (event.target.value.length > event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }

        const new_value = event.target.value;
        const newOtpCode = [...otpcode];
        newOtpCode[index] = new_value;
        setOtpCode(newOtpCode);
    }

    const otp_alert = document.createElement('div')
    otp_alert.className = "alert alert-danger d-none"

    function onVerifyBtnClicked(event) {
        console.log(pg_src)
        axios.post(`${backend_socket}/auth/otp/verify`, {
            'pg_src': pg_src,
            'phone_number': phone_number,
            'otp_code': otpcode.reduce((acc,curr)=>{
                console.log(acc)
                return acc+=curr
            },'')
        })
            .then(response => {
                return response.data;
            })
            .then(data => {
                console.log(data)
                if (data.responseMsg === "PHONE NUMBER VERIFIED") {
                    navigate(data.redirectResponse)
                } else {
                    setAlertMessage(data.responseData.message);
                    setAlertVisible(true);
                }
            }).catch(error => {
            setAlertMessage("An error occurred. Please try again.");
            setAlertVisible(true);
        });


    }

    return (<div className="container-body">
        <div className="container-fluid  container-content my-auto form-container-bg p-3">
            <div className="container-fluid   ">
                <div className="row">
                    <h1 className="chatter-logo text-center">Chatter</h1>
                </div>
                <div className="row">
                    <p className="text-white fw-bold text-center">Enter the OTP sent to <span
                        className="fw-light text-data">{phone_number}</span></p>
                </div>
                {alertVisible && (
                    <div className="alert alert-danger">
                        {alertMessage}
                    </div>
                )}
                <div className="row justify-content-center">
                    {otpcode.map((value, index) => {
                        return <input
                            className="rounded-3 p-2 m-2 text-center otp-code-txt no-spinner"
                            key={index}
                            type="number"
                            maxLength={1}
                            value={value}
                            onInput={(event) => {
                                onInputOtpTxt(event, index)
                            }}/>
                    })}
                </div>
                <div className="row">
                    <p className="text-white mt-4 mx-auto fw-light text-center" style={{fontSize: "13px"}}>Didn't
                        receive OTP
                        code within a minute ?
                        <button className="text-data btn p-0 mb-1 mx-1 " onClick={e => {
                            send_otp_code(phone_number)
                        }}>Resend</button>
                    </p>
                    <button className="btn chatter-btns rounded-pill  w-25 mx-auto my-3"
                            onClick={onVerifyBtnClicked}>Verify
                    </button>
                </div>
            </div>
        </div>
    </div>);
}

function send_otp_code(phone_number) {
    axios.post(`${backend_socket}/auth/otp/send`, {phone_number: phone_number})
        .then(response => {
            return response.data;
        })
        .then(data => {
            console.log(data.responseMsg);
        })
        .catch(error => {
            console.error(`Error:${error}`)
        })

}

import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {access_token_cookie, backend_socket, SIGN_IN, SIGN_UP, USER_FOUND} from "../util/constants";

export default function Auth() {
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
                    Cookies.remove(access_token_cookie);
                }
            }).catch(error => {
            console.error(`Error:${error}`);
        });
    }
    return <AuthForm/>;
}


function AuthForm() {
    let [phone_number, setPhoneNumber] = useState("")
    let [country_code, setCountryCode] = useState("")
    let [alertMsg, setAlertMsg] = useState(null);
    let navigate = useNavigate();

    function onAuthBtnsClicked(authType) {
        let full_phone_number = phoneNumberValidation(country_code, phone_number);
        if (!full_phone_number) {
            setAlertMsg(<>Invalid Phone Number</>);
            return;
        }
        full_phone_number = full_phone_number.replace(/ /g, '');
        if (authType === SIGN_IN) {
            axios.get(`${backend_socket}/auth/check/${full_phone_number}`)
                .then(response => {
                    return response.data
                })
                .then(data => {
                    if (data.responseData.number_available) {
                        setAlertMsg(<>Phone Number does not exist! <span style={{color: "red"}}>{"Sign up"}</span></>);
                    } else {
                        navigate("/otp", {
                            state: {
                                pg_src: SIGN_IN,
                                phone_number: full_phone_number
                            }
                        });
                    }
                }).catch(error => {
                console.error("Error:" + error)
            });
        } else {
            axios.get(`${backend_socket}/auth/check/${full_phone_number}`)
                .then(response => {
                    return response.data
                })
                .then(data => {
                    if (!data.responseData.number_available) {
                        setAlertMsg(<>Phone Number already exist! <span style={{color: "red"}}>{"Sign up"}</span></>);
                    } else {
                        navigate("/otp", {
                            state: {
                                pg_src: SIGN_UP,
                                phone_number: full_phone_number
                            }
                        });
                    }
                }).catch(error => {
                console.error("Error:" + error)
            });
        }

        //TODO  here i have to navigate to the otp page to send the code
        // " Navigate with these data {"phone_number","service_src"}
        // Before navigate in case the service_src is signin i have
        // to check if this phone number is already exists or not
        // in case yes then redirect but in case no then
        // show a msg shows that this number not signed up
    }

    let alert = <></>;
    if (alertMsg !== null) {
        alert = <div className="alert alert-danger visible  p-2 w-100 ">{alertMsg}</div>;
    } else {
        alert = <div className="alert alert-danger invisible  p-2 w-100 "></div>;
    }

    return (<div className="container-body">
        <div className="container-fluid  container-content my-auto form-container-bg p-3">
            {alert}
            <div className="container-fluid mb-5  ">
                <div className="row">
                    <i className="chatter-logo text-center" style={{fontSize: "100px"}}>Chatter</i>
                </div>
                <div className="row ">
                    <div className="input-group text-center m-auto phone-input">
                        <select className="input-group-text " name="country-code"
                                onChange={(e) => setCountryCode(e.target.value)}>
                            {countriesPhoneCodesOptions()}
                        </select>
                        <input id={"phone_number"} type="tel" className="form-control intl-tel-input"
                               placeholder="465358794" required onChange={(e) => setPhoneNumber(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="text-center p-4">
                        <button className="btn chatter-btns rounded-pill m-2"
                                onClick={e => onAuthBtnsClicked(SIGN_IN)}>Sign in
                        </button>
                        <button className="btn chatter-btns rounded-pill"
                                onClick={e => onAuthBtnsClicked(SIGN_UP)}>Sign up
                        </button>
                    </div>

                </div>
            </div>
        </div>

    </div>);
}

function countriesPhoneCodesOptions() {
    let countriesCodes = [{"countryCode": "AF", "phoneCode": "+93"}, {
        "countryCode": "AL", "phoneCode": "+355"
    }, {"countryCode": "DZ", "phoneCode": "+213"}, {"countryCode": "AD", "phoneCode": "+376"}, {
        "countryCode": "AO", "phoneCode": "+244"
    }, {"countryCode": "AG", "phoneCode": "+1"}, {"countryCode": "AR", "phoneCode": "+54"}, {
        "countryCode": "AM", "phoneCode": "+374"
    }, {"countryCode": "AU", "phoneCode": "+61"}, {"countryCode": "AT", "phoneCode": "+43"}, {
        "countryCode": "AZ", "phoneCode": "+994"
    }, {"countryCode": "BS", "phoneCode": "+1"}, {"countryCode": "BH", "phoneCode": "+973"}, {
        "countryCode": "BD", "phoneCode": "+880"
    }, {"countryCode": "BB", "phoneCode": "+1"}, {"countryCode": "BY", "phoneCode": "+375"}, {
        "countryCode": "BE", "phoneCode": "+32"
    }, {"countryCode": "BZ", "phoneCode": "+501"}, {"countryCode": "BJ", "phoneCode": "+229"}, {
        "countryCode": "BT", "phoneCode": "+975"
    }, {"countryCode": "BO", "phoneCode": "+591"}, {"countryCode": "BA", "phoneCode": "+387"}, {
        "countryCode": "BW", "phoneCode": "+267"
    }, {"countryCode": "BR", "phoneCode": "+55"}, {"countryCode": "BN", "phoneCode": "+673"}, {
        "countryCode": "BG", "phoneCode": "+359"
    }, {"countryCode": "BF", "phoneCode": "+226"}, {"countryCode": "BI", "phoneCode": "+257"}, {
        "countryCode": "CI", "phoneCode": "+225"
    }, {"countryCode": "CV", "phoneCode": "+238"}, {"countryCode": "KH", "phoneCode": "+855"}, {
        "countryCode": "CM", "phoneCode": "+237"
    }, {"countryCode": "CA", "phoneCode": "+1"}, {"countryCode": "CF", "phoneCode": "+236"}, {
        "countryCode": "TD", "phoneCode": "+235"
    }, {"countryCode": "CL", "phoneCode": "+56"}, {"countryCode": "CN", "phoneCode": "+86"}, {
        "countryCode": "CO", "phoneCode": "+57"
    }, {"countryCode": "KM", "phoneCode": "+269"}, {"countryCode": "CG", "phoneCode": "+242"}, {
        "countryCode": "CR", "phoneCode": "+506"
    }, {"countryCode": "HR", "phoneCode": "+385"}, {"countryCode": "CU", "phoneCode": "+53"}, {
        "countryCode": "CY", "phoneCode": "+357"
    }, {"countryCode": "CZ", "phoneCode": "+420"}, {"countryCode": "CD", "phoneCode": "+243"}, {
        "countryCode": "DK", "phoneCode": "+45"
    }, {"countryCode": "DJ", "phoneCode": "+253"}, {"countryCode": "DM", "phoneCode": "+1"}, {
        "countryCode": "DO", "phoneCode": "+1"
    }, {"countryCode": "EC", "phoneCode": "+593"}, {"countryCode": "EG", "phoneCode": "+20"}, {
        "countryCode": "SV", "phoneCode": "+503"
    }, {"countryCode": "GQ", "phoneCode": "+240"}, {"countryCode": "ER", "phoneCode": "+291"}, {
        "countryCode": "EE", "phoneCode": "+372"
    }, {"countryCode": "SZ", "phoneCode": "+268"}, {"countryCode": "ET", "phoneCode": "+251"}, {
        "countryCode": "FJ", "phoneCode": "+679"
    }, {"countryCode": "FI", "phoneCode": "+358"}, {"countryCode": "FR", "phoneCode": "+33"}, {
        "countryCode": "GA", "phoneCode": "+241"
    }, {"countryCode": "GM", "phoneCode": "+220"}, {"countryCode": "GE", "phoneCode": "+995"}, {
        "countryCode": "DE", "phoneCode": "+49"
    }, {"countryCode": "GH", "phoneCode": "+233"}, {"countryCode": "GR", "phoneCode": "+30"}, {
        "countryCode": "GD", "phoneCode": "+1"
    }, {"countryCode": "GT", "phoneCode": "+502"}, {"countryCode": "GN", "phoneCode": "+224"}, {
        "countryCode": "GW", "phoneCode": "+245"
    }, {"countryCode": "GY", "phoneCode": "+592"}, {"countryCode": "HT", "phoneCode": "+509"}, {
        "countryCode": "HN", "phoneCode": "+504"
    }, {"countryCode": "HU", "phoneCode": "+36"}, {"countryCode": "IS", "phoneCode": "+354"}, {
        "countryCode": "IN", "phoneCode": "+91"
    }, {"countryCode": "ID", "phoneCode": "+62"}, {"countryCode": "IR", "phoneCode": "+98"}, {
        "countryCode": "IQ", "phoneCode": "+964"
    }, {"countryCode": "IE", "phoneCode": "+353"}, {"countryCode": "IL", "phoneCode": "+972"}, {
        "countryCode": "IT", "phoneCode": "+39"
    }, {"countryCode": "JM", "phoneCode": "+1"}, {"countryCode": "JP", "phoneCode": "+81"}, {
        "countryCode": "JO", "phoneCode": "+962"
    }, {"countryCode": "KZ", "phoneCode": "+7"}, {"countryCode": "KG", "phoneCode": "+996"}, {
        "countryCode": "LA", "phoneCode": "+856"
    }, {"countryCode": "LV", "phoneCode": "+371"}, {"countryCode": "LB", "phoneCode": "+961"}, {
        "countryCode": "LS", "phoneCode": "+266"
    }, {"countryCode": "LR", "phoneCode": "+231"}, {"countryCode": "LY", "phoneCode": "+218"}, {
        "countryCode": "LI", "phoneCode": "+423"
    }, {"countryCode": "LT", "phoneCode": "+370"}, {"countryCode": "LU", "phoneCode": "+352"}, {
        "countryCode": "MG", "phoneCode": "+261"
    }, {"countryCode": "MW", "phoneCode": "+265"}, {"countryCode": "MY", "phoneCode": "+60"}, {
        "countryCode": "MV", "phoneCode": "+960"
    }, {"countryCode": "ML", "phoneCode": "+223"}, {"countryCode": "MT", "phoneCode": "+356"}, {
        "countryCode": "MH", "phoneCode": "+692"
    }, {"countryCode": "MR", "phoneCode": "+222"}, {"countryCode": "MU", "phoneCode": "+230"}, {
        "countryCode": "MX", "phoneCode": "+52"
    }, {"countryCode": "FM", "phoneCode": "+691"}, {"countryCode": "MD", "phoneCode": "+373"}, {
        "countryCode": "MC", "phoneCode": "+377"
    }, {"countryCode": "MN", "phoneCode": "+976"}, {"countryCode": "ME", "phoneCode": "+382"}, {
        "countryCode": "MA", "phoneCode": "+212"
    }, {"countryCode": "MZ", "phoneCode": "+258"}, {"countryCode": "MM", "phoneCode": "+95"}, {
        "countryCode": "NA", "phoneCode": "+264"
    }, {"countryCode": "NR", "phoneCode": "+674"}, {"countryCode": "NP", "phoneCode": "+977"}, {
        "countryCode": "NL", "phoneCode": "+31"
    }, {"countryCode": "NZ", "phoneCode": "+64"}, {"countryCode": "NI", "phoneCode": "+505"}, {
        "countryCode": "NE", "phoneCode": "+227"
    }, {"countryCode": "NG", "phoneCode": "+234"}, {"countryCode": "KP", "phoneCode": "+850"}, {
        "countryCode": "MK", "phoneCode": "+389"
    }, {"countryCode": "NO", "phoneCode": "+47"}, {"countryCode": "OM", "phoneCode": "+968"}, {
        "countryCode": "PK", "phoneCode": "+92"
    }, {"countryCode": "PW", "phoneCode": "+680"}, {"countryCode": "PA", "phoneCode": "+507"}, {
        "countryCode": "PG", "phoneCode": "+675"
    }, {"countryCode": "PY", "phoneCode": "+595"}, {"countryCode": "PE", "phoneCode": "+51"}, {
        "countryCode": "PH", "phoneCode": "+63"
    }, {"countryCode": "PL", "phoneCode": "+48"}, {"countryCode": "PT", "phoneCode": "+351"}, {
        "countryCode": "QA", "phoneCode": "+974"
    }, {"countryCode": "RO", "phoneCode": "+40"}, {"countryCode": "RU", "phoneCode": "+7"}, {
        "countryCode": "RW", "phoneCode": "+250"
    }, {"countryCode": "KN", "phoneCode": "+1"}, {"countryCode": "LC", "phoneCode": "+1"}, {
        "countryCode": "VC", "phoneCode": "+1"
    }, {"countryCode": "WS", "phoneCode": "+685"}, {"countryCode": "SM", "phoneCode": "+378"}, {
        "countryCode": "ST", "phoneCode": "+239"
    }, {"countryCode": "SA", "phoneCode": "+966"}, {"countryCode": "SN", "phoneCode": "+221"}, {
        "countryCode": "RS", "phoneCode": "+381"
    }, {"countryCode": "SC", "phoneCode": "+248"}, {"countryCode": "SL", "phoneCode": "+232"}, {
        "countryCode": "SG", "phoneCode": "+65"
    }, {"countryCode": "SK", "phoneCode": "+421"}, {"countryCode": "SI", "phoneCode": "+386"}, {
        "countryCode": "SB", "phoneCode": "+677"
    }, {"countryCode": "SO", "phoneCode": "+252"}, {"countryCode": "ZA", "phoneCode": "+27"}, {
        "countryCode": "KR", "phoneCode": "+82"
    }, {"countryCode": "SS", "phoneCode": "+211"}, {"countryCode": "ES", "phoneCode": "+34"}, {
        "countryCode": "LK", "phoneCode": "+94"
    }, {"countryCode": "SD", "phoneCode": "+249"}, {"countryCode": "SR", "phoneCode": "+597"}, {
        "countryCode": "SE", "phoneCode": "+46"
    }, {"countryCode": "CH", "phoneCode": "+41"}, {"countryCode": "SY", "phoneCode": "+963"}, {
        "countryCode": "TJ", "phoneCode": "+992"
    }, {"countryCode": "TZ", "phoneCode": "+255"}, {"countryCode": "TH", "phoneCode": "+66"}, {
        "countryCode": "TL", "phoneCode": "+670"
    }, {"countryCode": "TG", "phoneCode": "+228"}, {"countryCode": "TO", "phoneCode": "+676"}, {
        "countryCode": "TT", "phoneCode": "+1"
    }, {"countryCode": "TN", "phoneCode": "+216"}, {"countryCode": "TR", "phoneCode": "+90"}, {
        "countryCode": "TM", "phoneCode": "+993"
    }, {"countryCode": "TV", "phoneCode": "+688"}, {"countryCode": "UG", "phoneCode": "+256"}, {
        "countryCode": "UA", "phoneCode": "+380"
    }, {"countryCode": "AE", "phoneCode": "+971"}, {"countryCode": "GB", "phoneCode": "+44"}, {
        "countryCode": "US", "phoneCode": "+1"
    }, {"countryCode": "UY", "phoneCode": "+598"}, {"countryCode": "UZ", "phoneCode": "+998"}, {
        "countryCode": "VU", "phoneCode": "+678"
    }, {"countryCode": "VA", "phoneCode": "+379"}, {"countryCode": "VE", "phoneCode": "+58"}, {
        "countryCode": "VN", "phoneCode": "+84"
    }, {"countryCode": "YE", "phoneCode": "+967"}, {"countryCode": "ZM", "phoneCode": "+260"}, {
        "countryCode": "ZW", "phoneCode": "+263"
    }];
    countriesCodes.sort((a, b) => a.countryCode.localeCompare(b.countryCode))

    return countriesCodes.map((country, index) => {
        return <option key={index} value={country.phoneCode}>{country.countryCode}</option>
    });
}

function phoneNumberValidation(countryCode, number) {
    const {PhoneNumberUtil, PhoneNumberFormat} = require('google-libphonenumber');
    const phoneUtil = PhoneNumberUtil.getInstance();
    const phoneNumber = countryCode + number;
    try {
        const parsedPhoneNumber = phoneUtil.parse(phoneNumber, 'ZZ'); // 'ZZ' is a placeholder for an unknown region
        if (phoneUtil.isValidNumber(parsedPhoneNumber)) {
            return phoneUtil.format(parsedPhoneNumber, PhoneNumberFormat.INTERNATIONAL);
        } else {
            return false
        }
    } catch (error) {
        return false
    }


}


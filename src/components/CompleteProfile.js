import {CameraFill} from "react-bootstrap-icons";

export default function CompleteProfile() {
    return <CompleteProfileForm/>
};


function CompleteProfileForm() {
    return (
        <div className="container-body">
            <div className="container-fluid  container-content my-auto form-container-bg p-3">
                <div className="container-fluid">
                    <div className="row">
                        <h1 className="chatter-logo text-center" style={{fontSize: "96px"}}>Chatter</h1>
                    </div>
                    <div className="row">
                        <div className=" position-relative m-auto w-auto">
                            <img className="rounded-circle" alt="profile_pic" width={128}
                                 src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                            <div className="btn btn-light position-absolute bottom-0 end-0 me-2  rounded-circle p-2">
                                <CameraFill role={"button"} size={24} color={"gray"}/></div>
                        </div>
                    </div>
                    <div className="row">
                        <input className="form-control mx-auto complete-profile-inputs m-3 p-2 "
                               placeholder={"username"}/>
                    </div>
                    <div className="row">
                        <textarea className="form-control mx-auto complete-profile-inputs  m-1 p-2 " rows={3}
                                  placeholder={"Bio"}/>
                    </div>
                    <div className="row">
                        <button className="btn chatter-btns rounded-pill  w-25 mx-auto my-3">Finish</button>
                    </div>
                </div>
            </div>
        </div>

    );

}
import React from "react";
import BasePage from "./BasePage";
import {getUser} from "../config/session";
import ImageCropper from "../components/ImageCropper";
import InsertUpdateRecord from "../components/InsertUpdateRecord";
import pic from "../config/pic/pic.png";
import conf from "../object-config/user.json";


function Profile(){


    return (
        <BasePage title="Perfil">
            <div>
            <img src={getUser().profilePicture ? getUser().profilePicture.fullPath : pic} class="rounded-circle" alt="..." width="100px" style={{"maxHeight":"100px"}}/>

            <InsertUpdateRecord showTitle={true} configurations={conf} objectId={getUser().id}/>
            </div>

        </BasePage>
    )
}

export default Profile;
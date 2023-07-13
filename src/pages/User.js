import React from "react";
import BasePage from "./BasePage";
import ListRecord from "../components/ListRecord";
import conf from "../object-config/user.json";


function User(){

    return (
        <BasePage title="Usuário">
            <ListRecord showTitle={true} configurations={conf}/>

        </BasePage>
    )
}

export default User;
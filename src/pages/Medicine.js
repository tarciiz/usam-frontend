import React, { useState } from "react";
import BasePage from "./BasePage";
import ListRecord from "../components/ListRecord";
import conf from "../object-config/medicine.json";


function Medicine(){

    return (
        <BasePage title="Remédio">
            <ListRecord showTitle={true} configurations={conf}/>

        </BasePage>
    )
}

export default Medicine;
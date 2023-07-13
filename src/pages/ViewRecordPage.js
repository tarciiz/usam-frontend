
import React, {useState}from "react";
import BasePage from "./BasePage";
import { useSearchParams } from "react-router-dom"
import InsertUpdateRecord from "../components/InsertUpdateRecord";


function ViewRecordPage(props){
    const objectLabel = props.configurations.o_label;
    const [queryParameters] = useSearchParams()
    const objectId = (queryParameters.get("id"))
    return (
        <BasePage title={objectLabel}>
            <div>
                <InsertUpdateRecord configurations={props.configurations} objectId={objectId}/>


            </div>

        </BasePage>
    )
}

export default ViewRecordPage;
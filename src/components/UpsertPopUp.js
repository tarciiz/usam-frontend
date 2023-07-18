import React from "react";

import {Dialog } from 'evergreen-ui';
import InsertUpdateRecord from "./InsertUpdateRecord";
import { v4 as uuid } from 'uuid';
import { get } from "../config/requisitions";

function UpsertPopUp(props){
    const [confInsert, setConfInsert ] = React.useState(props.configurations);
    
    React.useEffect(() => {
        setConfInsert(require('../object-config/'+confInsert.o_name+'.json'));

    }, []);
    return (
        <>
        <Dialog
            isShown={props.isShown}
            title={'Adicionar '+props.configurations.o_label}
            hasFooter={false}
            width="700px"
            onCloseComplete={() => props.setIsShown(false)}
        >
            <InsertUpdateRecord whenDone={props.whenDone} existsObject={props.existsObject} key={uuid()} showTitle={false} configurations={confInsert} 
            deafultObjProp={props.deafultObjProp}
            whenUpsertDo={(usr)=>{
                props.setIsShown(false)
            }} whenCancelDo={()=>{
                
                props.setIsShown(false)
            }}/>
        </Dialog>
        </>
    )
}

export default UpsertPopUp;
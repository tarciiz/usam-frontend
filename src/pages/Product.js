import React from "react";
import BasePage from "./BasePage";
import ListRecord from "../components/ListRecord";
import UpsertPopUp from "../components/UpsertPopUp";

import {Group, Button, AddIcon, Icon, BarcodeIcon } from 'evergreen-ui';

function Product(props){
    const [isShown, setIsShown] = React.useState(false)
    const [update, setUpdate] = React.useState(1)

    return (
        <BasePage title={<>
                            <Icon icon={BarcodeIcon} size={25}></Icon>
                            &nbsp;
                            {props.configurations.o_plural_label}
                        </>}
                    buttons={
                        <Group  size="medium">
                            <Button  appearance="primary" onClick={()=>{setIsShown(true)}}>
                                Novo
                                &nbsp;
                                <Icon icon={AddIcon}></Icon>
                            </Button>
                        </Group>
                    
                    }
        >
            
            <ListRecord showTitle={true} configurations={props.configurations} update={update}/>

            <UpsertPopUp whenDone={()=>{updateList()}} isShown={isShown} setIsShown={setIsShown} configurations={props.configurations}/>
        </BasePage>
    )

    function updateList(){
        setUpdate(update+1)
    }
}

export default Product;
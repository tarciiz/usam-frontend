import React from "react";
import BasePage from "./BasePage";
import ListRecord from "../components/ListRecord";

import {Button, Group, AddIcon, Icon} from 'evergreen-ui';
import UpsertPopUp from "../components/UpsertPopUp";


function User(props){
    const [isShown, setIsShown] = React.useState(false)

    return (
        <BasePage title={props.configurations.o_plural_label} buttons={
            <Group  size="medium">
                <Button  appearance="primary" onClick={()=>{setIsShown(true)}}>
                    Novo
                    &nbsp;
                    <Icon icon={AddIcon}></Icon>
                </Button>
            </Group>
        
        }>
            <ListRecord showTitle={true} configurations={props.configurations}/>
            
            <UpsertPopUp isShown={isShown} setIsShown={setIsShown} configurations={props.configurations}/>

        </BasePage>
    )
}

export default User;
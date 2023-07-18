import React from "react";
import BasePage from "./BasePage";
import ListRecord from "../components/ListRecord";
import {Icon, ShopIcon, Group, AddIcon, Button } from 'evergreen-ui';
import UpsertPopUp from "../components/UpsertPopUp";


function Shop(props){
    const [isShown, setIsShown] = React.useState(false)

    return (
        <BasePage title={
            <>
                <Icon icon={ShopIcon} size={25}></Icon>
                &nbsp;
                {props.configurations.o_plural_label}
            </>
        }
        buttons={
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

export default Shop;
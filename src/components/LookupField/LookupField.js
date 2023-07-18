
import React, { useState, useEffect } from 'react';

import {get} from "../../config/requisitions";
import  './LookupField.css';
import {SelectMenu, Select } from 'evergreen-ui';
import Label from '../Label';


function LookupField(props){
    const f = props.field;
    const endpoint_get = props.field.lookup.endpoints.get_all;
    const forView = props.forView ? props.forView: false;
    const buildObject = props.buildObject;

    const [showDown, setShowDown] = useState(false);

    const [list, setList] = useState([])

    const [selected, setSelected] = useState(props.defVal ? props.defVal:null)


    useEffect(()=>{
        if(!forView){
            get(endpoint_get).then(resultList=>{
                setList(resultList)
                if(selected.id){
                    let obj = resultList.find(el=>{
                        return el.id == selected.id
                    })
                    setSelected(obj)
                    makeLookup(obj)

                }
            }).catch(error=>{
                
            })
        }
    },[])

    return(
        <>  
            <Label text={props.field.lookup.l_label}/>
            <SelectMenu
                title={props.field.lookup.l_plural_label}
                options={list.map((item) => ({ 
                    label:item.name, 
                    value: item.id
                    
                }))}
                selected={selected ? selected.id:null}
                filterPlaceholder={'Buscar ' + props.field.lookup.l_plural_label}
                closeOnSelect={true}    
                onSelect={(item) => {
                    
                    let obj = list.find(el=>{
                        return el.id === item.value
                    })
                    setSelected(obj)
                    makeLookup(obj)
                }}
            >
                <Select width="100%">
                    <option value={selected ? selected.id : ''} selected>
                        {(selected ? selected.name: '') || props.field.lookup.l_label}
                    </option>
                </Select>
            </SelectMenu>
        </>
    )

    function findIcon(iconname){
        setShowDown(true)
    }

    function makeLookup(item){
        let tgt = {value:(item === undefined) ? null: {id:item.id.toString()}, name:f.f_name}


        buildObject({target:tgt})
    }
}

export default LookupField;
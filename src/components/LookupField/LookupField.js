
import React, { useState, useEffect } from 'react';

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from 'react-bootstrap/Dropdown';
import {get} from "../../config/requisitions";
import  './LookupField.css';

function LookupField(props){
    const f = props.field;
    const endpoint_get = props.field.lookup.endpoints.get;
    const forView = props.forView ? props.forView: false;
    const buildObject = props.buildObject;

    const [selItem, setSelItem] = useState(props.defVal ? props.defVal: undefined);
    const [showDown, setShowDown] = useState(false);

    const [list, setList] = useState([])

    useEffect(()=>{
        if(!forView){
            get(endpoint_get).then(resultList=>{
                console.log("Result ", resultList)
                
                setList(resultList)
            }).catch(error=>{
                console.log("Erro ", error)
            })
        }
    },[])
    
    
    return(
        <div style={{'width':'inherit'}}>
            <div className="input-with-icon"> 
                {selItem === undefined ? '': <FontAwesomeIcon id="fa" icon={faXmark} onClick={e=>{removeItem()}}/>}

                {selItem === undefined ? 
                <input id={f.f_name} class="form-control" name={f.f_name} type={f.f_type} onKeyDown={e=>find(e)} defaultValue=""/>
                :<div id={f.f_name+'-div'} className="div-look" class="form-control"><i class={"fas "+f.lookup.l_fa_logo} style={{'marginRight':'10px'}}></i>{selItem ? selItem[f.d_prop] :''}</div>}
                
                
            </div>
            <div className="input-with-icon">
                <Dropdown.Menu show={showDown} style={{'width':'100%'}}>

                    {list.map((item, index)=>(
                            <Dropdown.Item onClick={e=>{selectItem(item)}} eventKey={index.toString()}>
                                <i class={"fas "+f.lookup.l_fa_logo} style={{'marginRight':'10px'}}></i>
                                
                                {item[f.d_prop]}
                            </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </div>
        </div>
    )

    function find(e){
        setShowDown(true)
    }

    function removeItem(){        
        setSelItem(undefined)
        makeLookup(undefined)
    }

    function selectItem(item){       
        makeLookup(item)
        setShowDown(false)
        setSelItem(item)

    }
    
    function makeLookup(item){
        let tgt = {value:(item === undefined) ? null: {id:item.id}, name:f.f_name}


        buildObject({target:tgt})
    }
}

export default LookupField;
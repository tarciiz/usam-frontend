import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link} from 'react-router-dom';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

import {post, get} from "../config/requisitions";

function LisrRecord(props){
    const fields = (props.configurations.fields.filter(field => {return field.f_hide_on_list !== true}))
    const objectLabel = props.configurations.o_label
    const objectName = props.configurations.o_name
    const endpoint_get_all = props.configurations.endpoints.get_all
    const [objectList, setObjectList] = useState([])
    
    const [objectListSelected, setObjectListSelected] = useState([])
    const [objectListShow, setObjectListShow] = useState([])
    const [displayNum, setDisplayNum] = useState(10)
    const [pageNum, setPageNum] = useState(1)
    const [maxPages, setMaxPages] = useState(1)

    useEffect(() => {
        get(endpoint_get_all).then(resultList=>{
            setObjectList(resultList)

            formatList(resultList, displayNum, ((pageNum-1)*displayNum))

            setMaxPages(Math.ceil(resultList.length / displayNum));

        }).catch(error=>[
            console.log('Error ', error)
        ])

    }, []);

    return (
        <div style={{"height":"89vh"}}>
            <table class="table" style={{"height":"90%"}}>
                <thead class="thead">
                    <tr>
                        <th scope="col">#</th>
                        
                        {fields.map(field=>(
                            <th scope="col">{field.f_label}</th>

                        ))}
                        
                    </tr>
                </thead>

                <tbody>
                    {
                        objectListShow.map(element=>(
                            <tr scope="row">
                                <td>
                                    <input class="form-check-input" type="checkbox" value={element.id} id="flexCheckDefault" onClick={e=>{
                                        setObjectListSelected([...objectListSelected, e.target.value])
                                    }}/>
                                </td>

                                {fields.map(field=>(
                                    <td>{
                                            (field.f_main === true) ? 
                                            
                                            <Link class="link-opacity-100" to={"/"+objectName+"/view?id="+element.id} onClick={(e)=>{goToRecord(element)}} >
                                                {formatValue(element[field.f_name], field)}

                                            </Link>
                                            
                                            :
                                            formatValue(element[field.f_name], field)
                                        }</td>        
                                ))}
                            </tr>
                        ))
                    }
                </tbody>

               
            </table>

            <div class="d-fex text-center w-100 align-middle">

                <button type="button" class="btn btn-link link-dark" onClick={e=>{removePage()}}>
                    <FontAwesomeIcon icon={faAngleLeft} /> 
                </button>
                &nbsp;&nbsp;
                página {pageNum} de {maxPages}
                &nbsp;&nbsp;
                <button type="button" class="btn btn-link link-dark"  onClick={e=>{addPage()}}>
                     <FontAwesomeIcon icon={faAngleRight} /> 
                </button>
            </div>
        
        </div>
    )
    
    function goToRecord(rec){
        console.log('Goto ', rec.id, rec.name)
    }

    function removePage(){
        let newPnum = pageNum-1 

        if(newPnum === 0) return;

        setPageNum(newPnum)
        formatList(objectList, displayNum, ((newPnum-1)*displayNum))
    }

    function addPage(){
        let newPnum = pageNum+1
        if(maxPages < newPnum) return;

        setPageNum(newPnum)

        formatList(objectList, displayNum, ((newPnum-1)*displayNum))

    }

    function formatList(list, numEl, numSkip) {
        const result = [];
        
        for (let i = numSkip; i < list.length; i += numSkip + 1) {
          if (result.length === numEl) {
            break;
          }
          result.push(list[i]);
        }
        console.log("result ", result);
        setObjectListShow(result);
    }

    function formatMoney(val){
        let money;

        money = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return money;
    }

    function formatDate(localDateTimeArray){
        if(!localDateTimeArray) return;
        let  date = new Date(localDateTimeArray[0], localDateTimeArray[1] - 1, localDateTimeArray[2], localDateTimeArray[3], localDateTimeArray[4], localDateTimeArray[5]);

        // Format the date as "dd/mm/aaaa hh:mm"
        return date.toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
        });
    }

    function formatValue(value, f){
        let val=value;
        switch(f.f_format){
            case "datetime":
                val = formatDate(value)

                break;

            case "user":
                val = value.name

                break;
            case "lookup":
                val = value ? value.name :''

                break;
            case "money":
                val = formatMoney(value)

                break;

        } 
        
        return val;
    }
}

export default LisrRecord;
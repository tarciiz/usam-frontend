import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {post, get} from "../config/requisitions";
import ImageCropper from "./ImageCropper";
import LookupField from "./LookupField/LookupField";
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-toastify/dist/ReactToastify.css';

function InsertUpdateRecord(props){
    // const [loading, setLoading] = useState(false)

    const [fields, setFields] = useState(props.configurations.fields)
    const columns = props.configurations.columns
    const objectName = props.configurations.o_label
    const endpoint_save = props.configurations.endpoints.save
    const endpoint_get = props.configurations.endpoints.get
    const endpoint_update = props.configurations.endpoints.update

    //props need to have conf attribute
    const [arrays, setArrays] = useState([])
    const [rownum, setRownum] = useState(0)
    const [forView, setForView] = useState(false)
    const [isHovering, setIsHovering] = useState(false);
    const [objectId, setObjectId] = useState(props.objectId ? props.objectId: undefined);


    const [object, setObject] = useState({})
    const [existsObject, setExistsObject] = useState({})

    useEffect(() => {
        setArrays(separateFieldsByColumns(fields, columns))
        setRownum(separateFieldsByColumns(fields, columns).length)

        
        if(objectId){
            getObject(objectId);
        }
    }, []);

    const fieldRender = (f)=>{
        if(!f ) return "";
        if(f.f_for_view === true && (!forView)) return "";
        
        let field = (<input id={f.f_name} class="form-control" name={f.f_name} type={f.f_type} onChange={e=>buildObject(e)} defaultValue={existsObject[f.f_name] ? existsObject[f.f_name]: ''}  step="0.01"/>)

        if(f.f_format){
            switch(f.f_format){
                case "image":
                    field = (<ImageCropper/>)
                    break;
                case "lookup":
                    field = <LookupField forView={forView} field={f} defVal={existsObject[f.f_name]} buildObject={e=>buildObject(e)}/>
                    break;
            } 
        }

        if(forView){
            let val = (existsObject[f.f_name] ? 
                                
                (typeof existsObject[f.f_name]  === "object")&&f.f_format==="lookup"? 
                    (
                        <>
                            <i class={"fas "+f.lookup.l_fa_logo} style={{'marginRight':'10px'}}></i>
                            <span>{existsObject[f.f_name][f.d_prop]}</span>
                        </>
                    )
                :existsObject[f.f_name]
            : '');

            if(f.f_format){
                switch(f.f_format){
                    case "datetime":
                        val = formatDate(existsObject[f.f_name])

                        break;

                    case "user":
                        val = existsObject[f.f_name.replace('Id', '')] ? existsObject[f.f_name.replace('Id', '')].name : ''

                        break;
                    case "money":
                        val = formatMoney(existsObject[f.f_name])

                        break;

                } 
            }
            field = (
                <div style={{'borderBottom':'1px solid rgba(0, 0, 0, 0.2)'}}>
                    <label class="mb-1" id={f.f_name} name={f.f_name} style={{'width': '100%', 'display':'flex'}}>
                        <b style={{'margin-right': 'auto'}}>
                            {
                                val
                            }
                        </b>
                        {f.f_for_view !== true? 
                        <span class="icon-wrapper" style={{'position': 'relative'}}>
                            <FontAwesomeIcon class="icon" style={{'color': 'gray', 'width':'16px', 'align-self':'center', 'opacity': isHovering ? '1':'0.3', 'transition': 'opacity 0.1s'}} icon={faPenToSquare} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={(e)=>{setForView(false)}}/>
                        </span>
                        : ''}
                    </label>
                </div>
                )
        }

        return (
                <div style={{'marginBottom':'15px'}}>
                    <label htmlFor={f.f_name} style={{color:'gray'}}>{f.f_label}</label>
                    <br/>
            
                    {field}
                </div>
                
            )
    }

    return (
        <div>
            {props.showTitle ? <h3>{objectName}</h3> :''}

            <div className="container">
                {
                    Array(rownum).fill().map((_, row_i) => (
                        <div class="row" key={row_i}>
                            {
                                Array(columns).fill().map((_, col_i) => (
                                    <div class="col-sm" key={row_i+'_'+col_i}>
                                        {fieldRender(arrays[row_i][col_i])}
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                <br/>
                {forView ? '':<button class="btn btn-primary" onClick={()=>{saveObject()}}>Salvar</button>}

            </div>

        </div>
    )

    function saveObject(){
        console.log("Object to save", object)

        var end =  object.id ? endpoint_update: endpoint_save;
        
        console.log("Save on ", end)
        post(end, object).then(savedObj=>{
            toast.success("Salvo com sucesso 😍!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });

                get(endpoint_get+'/'+savedObj.id).then(ret=>{
                    getObject(ret.id)
                    console.log('Saved obj ', ret)


                }).catch(error=>{
                    toast.error("Erro, recarregue a página 😥!", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                    setForView(false)
                })


            }).catch(error=>{
                toast.error("Erro ao salvar 😥!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setForView(false)

            })

    }

    function buildObject(e){
        let obj = object
        obj[e.target.name] = e.target.value

        setObject(obj)
    }

    function separateFieldsByColumns(fields, columns) {
        const rows = [];
        let currentRow = [];
      
        fields.forEach(field => {
          currentRow.push(field);
      
          if (currentRow.length === columns) {
            rows.push(currentRow);
            currentRow = [];
          }
        });
      
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        return rows;
    }

    function getObject(objectId){
        if(objectId){
            get(endpoint_get+'/'+objectId).then(resultObj=>{

                get('user/find/'+resultObj.createdById).then(createdBy=>{

                    resultObj.createdBy = createdBy;

                    get('user/find/'+resultObj.updatedById).then(createdBy=>{    
                        resultObj.updatedBy = createdBy;

                        console.log('resultObj', resultObj)

                        setExistsObject(resultObj)
                        setObject({"id":resultObj.id})
                        setForView(true)
                        
                    }).then(error=>{
                        console.log(error);
                    });

                }).then(error=>{
                    console.log(error);
                }); 

            }).catch(error=>{
                console.log("Erro ", error)
            })
    
        }
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

    function formatMoney(val){
        let money;

        money = val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return money;
    }
}

export default InsertUpdateRecord;

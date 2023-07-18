import React, { useState, useEffect } from 'react';
import {post, get} from "../config/requisitions";
import ImageCropper from "./ImageCropper";
import LookupField from "./LookupField/LookupField";
import { Icon, EditIcon, TextInputField, Button, toaster, PeopleIcon, ShopIcon, BarcodeIcon, InheritedGroupIcon, MoreIcon, Popover, Position } from 'evergreen-ui';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import HoverPopover from './HoverPopover';
import LookupPreview from './LookupPreview';


function InsertUpdateRecord(props){
    //props need to have conf attribute
    const [arrays, setArrays] = useState([])
    const [rownum, setRownum] = useState(0)
    const [forView, setForView] = useState(false)
    const [isHovering, setIsHovering] = useState(false);
    const [objectId, setObjectId] = useState(props.objectId ? props.objectId: undefined);


    const [object, setObject] = useState({})
    const [existsObject, setExistsObject] = useState(props.existsObject ? props.existsObject:{})    
    // const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState(props.configurations.fields)
    const columns = props.configurations.columns
    const objectName = props.configurations.o_label
    const endpoint_save = props.configurations.endpoints.save
    const endpoint_get = props.configurations.endpoints.get.replace('{id}', objectId)
    const endpoint_update = props.configurations.endpoints.update


    const iconMap = {
        "BarcodeIcon": BarcodeIcon,
        "PeopleIcon": PeopleIcon,
        "ShopIcon": ShopIcon,
        "InheritedGroupIcon": InheritedGroupIcon
        // Add more mappings as needed
    };
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
        
        let field = (<>
            <TextInputField
                id={f.f_name}
                label={f.f_label}
                placeholder={f.f_label}
                name={f.f_name} type={f.f_type} 
                onChange={e=>buildObject(e)} 
                defaultValue={existsObject[f.f_name] ? existsObject[f.f_name]: ''}  
                step="0.01"
            />
            
        </>)

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
                            <HoverPopover content={
                                <LookupPreview configurations={f.lookup} objectId={existsObject[f.f_name].id} icon={iconMap[f.f_icon]}/>
                            }>
                                <Link to={ "/"+f.f_name+"/view?id="+existsObject[f.f_name].id}  >
                                    
                                    <span><Icon icon={iconMap[f.f_icon] } size={12}/>
                                    &nbsp;{existsObject[f.f_name][f.d_prop]}</span>

                                </Link>
                            </HoverPopover>
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
                        <b style={{'marginRight': 'auto'}}>
                            {
                                val
                            }
                        </b>
                        {f.f_for_view !== true? 
                        <span class="icon-wrapper" onClick={(e)=>{setForView(false)}} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} style={{'position': 'relative', 'color': 'gray', 'width':'16px', 'alignSelf':'center', 'opacity': isHovering ? '1':'0.3', 'transition': 'opacity 0.1s'}}>
                            
                            <Icon icon={EditIcon} size={15} />
                        </span>
                        : ''}
                    </label>
                </div>
                )
        }

        return (
                <div style={{'marginBottom':'15px', overflow: 'visible'}}>
                    {forView ? <><label htmlFor={f.f_name} style={{color:'gray'}}>{f.f_label}</label> <br></br> <br></br></>:<></>
                    }
                    
                    {field}

                    {forView? <><br></br></>:<></>}
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
                {forView ? '':(<div style={{float:'right'}}>
                        <Button onClick={()=>{cancelEdit()}} marginRight={7} >Cancelar</Button>
                        <Button appearance="primary" onClick={()=>{saveObject()}}>Salvar</Button>
                    </div>
                )}

            </div>

        </div>
    )

    function saveObject(){

        if(object.id){
            object.id = object.id.toString()
        }
        
        var end =  object.id ? endpoint_update: endpoint_save;

        if(props.deafultObjProp){
            for (let key in props.deafultObjProp) {
                if (props.deafultObjProp.hasOwnProperty(key)) {
                    object[key] = props.deafultObjProp[key];
                }
            }
        }

        post(end, object).then(savedObj=>{
            console.log('Object to save ', object);
            setObject({id:savedObj.id})
            setExistsObject(savedObj)
            getObject(savedObj.id)

            if(props.whenUpsertDo){
                props.whenUpsertDo(savedObj)
            
            }

            if(props.whenDone){
                props.whenDone()
            }

            toaster.success("Salvo com sucesso 😍!", {
                duration: 3,
            });
            setForView(true)
        
        }).catch(error=>{
            setForView(false)
            console.log(error)
            toaster.danger("Erro ao salvar 😥!", {
                duration: 3,
            });
        })

    }
    function cancelEdit(){
        if(props.whenCancelDo){
            props.whenCancelDo()
        
        }
        setForView(true)
    }

    function buildObject(e){
        let obj = object
        obj[e.target.name] = e.target.value
        if(obj.id)obj.id = obj.id.toString()
        
        setObject(obj)
    }

    function separateFieldsByColumns(fields, columns) {
        const separatedFields = [];
        const rows = Math.ceil(fields.length / columns);
    
        let currentRow = [];
        let currentIndex = 0;
    
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            const field = fields[currentIndex];
            currentRow.push(field);
            currentIndex++;
    
            if (currentIndex === fields.length) {
              break;
            }
          }
    
          separatedFields.push(currentRow);
          currentRow = [];
        }
    
        return separatedFields;
    }

    function getObject(objectId){
        if(objectId){
            get(endpoint_get).then(resultObj=>{

                setExistsObject(resultObj)
                setObject({"id":resultObj.id})
                setForView(true)
                // get('user/find/'+resultObj.createdById).then(createdBy=>{

                //     resultObj.createdBy = createdBy;

                //     get('user/find/'+resultObj.updatedById).then(createdBy=>{    
                //         resultObj.updatedBy = createdBy;


                        
                //     }).then(error=>{
                    
                //     });

                // }).then(error=>{
                    
                // }); 

            }).catch(error=>{
                
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

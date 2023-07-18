import React from "react";
import BasePage from "./BasePage";
import ListRecord from "../components/ListRecord";
import {Icon, ChevronBackwardIcon ,Text } from 'evergreen-ui';
import { get } from "../config/requisitions";
import { useSearchParams, Link } from "react-router-dom"


function Related(props){
    const [isShown, setIsShown] = React.useState(false)
    const [queryParameters] = useSearchParams()
    const objectId = (queryParameters.get("id"))
    const relatedListIndex = (queryParameters.get("rli"))
    const objectName = props.configurations.o_name
    const objectLabel = props.configurations.o_label
    const conf = props.configurations.related[relatedListIndex]
    const endpoint_get = props.configurations.endpoints.get.replace('{id}', objectId)

    const isSimpleView = false

    const [object, setObject] = React.useState()

    
    React.useEffect(() => {        
        get(endpoint_get).then(obj=>{
            setObject(obj)
        }).catch(error=>{
            console.log('Error comp: Related', error)
        })
    }, []);

    return (
        <BasePage title={
                            <Link to={"/"+objectName+"/view?id="+objectId}>
                                
                                <div style={{display:'flex', alignItems: 'baseline'}}>
                                    <Icon icon={ChevronBackwardIcon}  size={23}></Icon>
                                    &nbsp;
                                
                                    <span style={{fontSize:"20px"}}> Voltar para {objectLabel} -&nbsp;</span>{object ? object.name : ''}
                                </div>
                            </Link>
                        }
        >
            <ListRecord showTitle={isSimpleView} showSearch={!isSimpleView} displayNum={isSimpleView ? 3 : undefined} showNumPerPage={!isSimpleView} relatedFrom={objectName} objectId={objectId} configurations={conf} completeView={true}/>
            
        </BasePage>
    )
}

export default Related;
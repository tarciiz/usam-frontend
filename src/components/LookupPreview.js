import React from 'react';
import { Pane, Icon } from 'evergreen-ui';
import { get} from "../config/requisitions";

const LookupPreview = (props) => {
    const [existsObject, setExistsObject] = React.useState({})    
    const endpoint_get = props.configurations.endpoints.get.replace('{id}', props.objectId)
    const fields = props.configurations.l_fields
    const label = props.configurations.l_label

    React.useEffect(() => {
        getObject(props.objectId);
    }, []);
  return (
    <Pane width={400} >
        <h3 style={{fontSize:20}}><Icon icon={props.icon } size={15}/> {label}</h3>
        {
            fields.map((field)=>(
                existsObject[field.l_f_name] ?
                <>
                    <label style={{fontSize:12}} for={field.l_f_name}>{field.l_f_label}</label>
                    <b><p id={field.l_f_name} >{existsObject[field.l_f_name]}</p></b>
                </>
                : <></>
            )
        )}
    </Pane>
  );

  function getObject(objectId){
    if(objectId){
        get(endpoint_get).then(resultObj=>{
            setExistsObject(resultObj)

        }).catch(error=>{
            
        })

    }
}
};

export default LookupPreview;
import React from "react";


import { useSearchParams } from "react-router-dom"
import ListRecord from "./ListRecord";

function RelatedList(props) {
  const [queryParameters] = useSearchParams()
  const objectId = (queryParameters.get("id"))
  const objectName = props.configurations.o_name

    const isSimpleView = true

  return (
    <div >
        {
          props.configurations.related.map((conf, i)=>(
            <div style={{marginBottom:'20px'}}>
              
              <ListRecord relatedListIndex={i} showTitle={isSimpleView} showSearch={!isSimpleView} displayNum={isSimpleView ? 3 : undefined} showNumPerPage={!isSimpleView} relatedFrom={objectName} objectId={isSimpleView ? objectId : undefined} configurations={conf} completeView={false}/>

            </div>
          ))
        }
    </div>
  );
}

export default RelatedList;

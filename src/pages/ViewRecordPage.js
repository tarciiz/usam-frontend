
import React from "react";
import BasePage from "./BasePage";
import { useNavigate } from 'react-router-dom';
import { del } from "../config/requisitions";
import { useSearchParams } from "react-router-dom"
import InsertUpdateRecord from "../components/InsertUpdateRecord";

import { Link} from 'react-router-dom';
import { Dialog, Pane, Text, Icon, ChevronBackwardIcon,ChevronDownIcon, Group, Button, TrashIcon } from 'evergreen-ui';
import RelatedList from "../components/RelatedList";


function ViewRecordPage(props){
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams()
    const objectId = (queryParameters.get("id"))
    const objectPluralLabel = props.configurations.o_plural_label;
    const objectName = props.configurations.o_name;
    const endpoint_del = props.configurations.endpoints.delete.replace('{id}', objectId);
    const [isShown, setIsShown] = React.useState(false)


    return (
        <BasePage title={
                <Link to={"/"+objectName}  >
                    <Icon icon={ChevronBackwardIcon}  size={23}></Icon>
                    &nbsp;
                    {objectPluralLabel}

                </Link>}
                buttons={
                    <Group  size="medium">
                        <Button  appearance="primary" intent="danger" onClick={()=>{
                            setIsShown(true)
                        }}>
                            <Icon icon={TrashIcon}></Icon>
                            &nbsp;
                            Excluir
                        </Button>
                    </Group>
                
                }>

            <Dialog
                    isShown={isShown}
                    title="Confirme a exclusão"
                    intent="danger"
                    onConfirm={() => {
                        setIsShown(false)
                        del(endpoint_del)

                        navigate('/'+objectName);
                    }}
                    onCancel={()=>{
                        setIsShown(false)
                        
                    }}
                    confirmLabel="Excluir"
                >
                    Esta ação é permanente e não pode ser desfeita!
            </Dialog>

            <div style={{display:"flex", padding:"2%", paddingTop:0}}>
                <Pane minWidth="50%;" width="100%">
                    <Pane style={{backgroundColor:"#e6e6eb", height:"30px", display:"flex", alignItems:"center"}} elevation={1}>
                        <div style={{marginLeft:'50px', display:"flex", alignItems:"center"}}>
                            <Text size={500}>Detalhes</Text>
                            &nbsp;
                            <Icon icon={ChevronDownIcon} size={15} />
                            
                        </div>
                    </Pane>
                    <br></br>

                    <InsertUpdateRecord configurations={props.configurations} objectId={objectId}/>

                    
                </Pane>

                {( props.configurations.related ? props.configurations.related.length > 0 :false)? 
                        <Pane minWidth="40%" style={{marginLeft:"20px"}}>
                            

                            <RelatedList objectId={objectId} showTitle={true} configurations={props.configurations}/>
                            
                        </Pane>
                    :<></>
                }
            </div>

        </BasePage>
    )
}

export default ViewRecordPage;
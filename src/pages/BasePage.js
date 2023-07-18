import Menu from "../components/Menu";

import { Pane, Heading } from 'evergreen-ui';


function BasePage(props){

    return (
        <div>
            <Pane style={{width: '100%'}}>
                <Menu/>
            </Pane>
            <Pane >
                {(props.title !== undefined && props.title !== null) ? 
                <Pane background={'#e6e6eb'} marginTop="20px" marginBottom="20px"
                      elevation={1}>
                    <Heading size={900} padding={20}>
                        {props.title}

                        <div style={{float:'right'}}>
                            {props.buttons}
                        </div>
                    </Heading>
                    

                </Pane>
                :<></>
                }

                {/* Content */}
                <Pane >
                    
                    {props.children}
                </Pane>


            </Pane>
            
        </div>)
}

export default BasePage;
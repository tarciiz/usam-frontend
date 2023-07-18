import { useContext, useEffect } from 'react';

import BasePage from "./BasePage";
import {getUser, getUpToDateUser} from "../config/session";
import InsertUpdateRecord from "../components/InsertUpdateRecord";
import conf from "../object-config/user.json";
import { UserContext } from '../config/UserContext';


import { Avatar, Text } from 'evergreen-ui';

function MyProfile(){
  const { user, updateUser } = useContext(UserContext);
  useEffect(() => {
    getUpToDateUser().then((updatedUser) => {
      updateUser(updatedUser);
    });
  }, []);

    return (
        <BasePage title="Meu Perfil">
            <div  style={{marginLeft:"5%"}}>
              <div style={{display:"flex", alignItems:"center"}}>
                <Avatar
                    src=""
                    name={user.name} 
                    size={80}
                  />
                  &nbsp;
                  &nbsp;

                <Text size={500}>{user.name}</Text>
              </div>
              
              <br></br>
              <br></br>
              <InsertUpdateRecord showTitle={false} configurations={conf} objectId={getUser().id} whenUpsertDo={(usr)=>{
                updateUser(usr)
              }}/>
            </div>

        </BasePage>
    )
}

export default MyProfile;
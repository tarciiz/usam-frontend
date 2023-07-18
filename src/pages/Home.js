import { getUpToDateUser} from '../config/session';
import { useContext, useEffect } from 'react';
import { UserContext } from '../config/UserContext';

import BasePage from './BasePage';

function Home(){    
    // validateUser()
    const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    getUpToDateUser().then((updatedUser) => {
      updateUser(updatedUser);
    });
  }, []);

    return(
        <BasePage title="Home">       

            Olá {user.name} <br/>
            Seu email é: {user.email}<br/>
            Seu login é: {user.login}<br/>
            Sua senha é: secreta!

        </BasePage>
    
    )
}

export default Home;
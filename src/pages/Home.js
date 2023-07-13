import { getUser} from '../config/session';
import { logOut} from '../config/session';
import { validateUser} from '../config/session';
import { uploadFile} from '../config/requisitions';
import { get} from '../config/requisitions';
import react from 'react';
import BasePage from './BasePage';


function Home(){    
    // validateUser()
    return(
        <BasePage title="Home">       

            Olá {getUser().name} <br/>
            Seu email é: {getUser().email}<br/>
            Seu login é: {getUser().login}<br/>
            Sua senha é: secreta!
            <a href="#" onClick={()=>{
                window.open('/', '_self')
                logOut() 
            }}>Sair</a>
        </BasePage>
    
    )
}

export default Home;
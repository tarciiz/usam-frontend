import {useState} from 'react';
import { login_user } from '../config/requisitions';
import { setUser} from '../config/session';
import { useNavigate } from 'react-router-dom';

import { Button, TextInputField, Pane, toaster, Spinner} from 'evergreen-ui'

function Login(){
    const [isLoggingIn, setIsLogginIn] = useState(false)
    const navigate = useNavigate();

    const handleNav = () => {
        navigate('/home');
      };
    

    var login
    var password

    const errorMessage = (m)=>{
        toaster.danger(m, {
            duration: 3,
          });
    }
    const successMessage = (m)=>{
        toaster.success(m, {
            duration: 3,
          });
    }


    
    return(<Pane clearfix
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                width={'100vw'}
                height={'100vh'}>
        <Pane
            elevation={3}
            float="left"
            width={'60%'}
            height={'60%'}
            margin={24}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column">

            {isLoggingIn ? 
                <Spinner />
            :<>
                <h1 class="bp5-heading">Bem-vindo!</h1>

                <div>
                    <TextInputField
                        label="Login ou email"
                        placeholder="Digie seu email"
                        onChange={(e)=>{
                            login = e.target.value
                        }}
                    />

                    <TextInputField
                        label="Senha"
                        placeholder="Digite sua senha"
                        type="password"
                        onChange={(e)=>{
                            password = e.target.value
                        }}
                    />

                <p>Esqueceu a senha?</p>
                <Button marginRight={16} appearance="primary" onClick={()=>{doLogin()}}>
                    Login
                </Button>
                </div>
        </>
        }
        </Pane>
        
                
        </Pane>)

    function doLogin(){
        setIsLogginIn(true)
        

        login_user(login, password).then(result=>{
            

            if(result == null || result === undefined){
                errorMessage('Verifique as credencias e tente novamente.')

            }else{
                successMessage('Bem-vindo, ' +result.name)


                setUser(result)
                handleNav();
            }
        }).catch(error=>{
            
            errorMessage('error')
            setIsLogginIn(false)
        })
    }
}

export default Login;
import react from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { login_user } from '../config/requisitions';
import { get } from '../config/requisitions';
import { setUser} from '../config/session';
import { useNavigate } from 'react-router-dom';


function Login(){
    let inputBg = {'background-color': '#E9ECEF'};
    const navigate = useNavigate();

    const handleNav = () => {
        navigate('/home');
      };
    

    var login
    var password

    const errorMessage = (m)=>{
        toast.error(m, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }
    const successMessage = (m)=>{
        toast.success(m, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    }

    
    return(<div class="d-flex flex-column align-items-center">
                <FontAwesomeIcon style={{'color': '#CD0000', 'width':'115px', 'height':'101px'}} icon={faHeartbeat} />

        
                <h1 class="p-3 display-3"><b>Bem-vindo!</b></h1>

                <label for="email" class="align-self-start mb-2 ">Login ou email</label>
                <input type="email" style={inputBg} class="mb-3 form-control" id="email" aria-describedby="emailHelp" placeholder="Login ou email" onChange={(e)=>{
                    login = e.target.value

                }}/>

                <label for="email" class="align-self-start mb-2 ">Senha</label>
                <input type="password" style={inputBg} class="mb-3 form-control" id="email" aria-describedby="emailHelp" placeholder="Password" onChange={(e)=>{
                    password = e.target.value

                }}/>

                
                <a class="link-opacity-25 align-self-start" href="#">Esqueceu a senha?</a>
                <button type="button" class="btn btn-primary align-self-end" onClick={()=>{
                    console.log('Login ', login)
                    console.log('Senha ', password)

                    login_user(login, password).then(result=>{
                        console.log("Result ", result)

                        if(result == null || result === undefined){
                            errorMessage('Verifique as credencias e tente novamente.')

                        }else{
                            successMessage('Bem-vindo, ' +result.name)


                            setUser(result)
                            handleNav();
                        }
                    }).catch(error=>{
                        console.log('Error ', error.text())
                        errorMessage(error.text())
                    })
                }}>Login</button>

           </div>)
}

export default Login;
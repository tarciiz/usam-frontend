
import { toast } from 'react-toastify';
import { get } from './requisitions';

const basePath = '/usam'

export { basePath }

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

export function validateUser(){
    let user = localStorage.getItem('logged_user')
    if(user === null || user === undefined){
        errorMessage("Por Favor, faça login para acessar a página")
        window.location.href = basePath+"/"
    }
}

export function setUser(user){
    localStorage.setItem('logged_user', JSON.stringify(user))
}

export function getUser(){
    var usr = JSON.parse(localStorage.getItem('logged_user'))
    return usr ? usr:{} 
}

export async function getUpToDateUser(){
    var usr = JSON.parse(localStorage.getItem('logged_user'))
    if(usr.id){
        return usr = await get('user/'+usr.id)
    }

    return {}
}


export function logOut(){
    localStorage.removeItem('logged_user')
    window.location.href = basePath+"/"
}
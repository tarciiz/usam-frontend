import {getUser} from './session';

const HOST = 'http://localhost:8082/'
//const HOST = 'https://tarciiz-web-server.loca.lt/'

const API = 'api/v1/app/'


const headers = {
    'Content-type': 'application/json', 
    'Bypass-Tunnel-Reminder':'true',
    'UserId': getUser().id
}

export async function get(endpoint){
    try{
        const fetched = await fetch(HOST+API+endpoint, {method:'GET', headers: headers})
        
        if (fetched.ok){
            try{
                const result = await fetched.json();
                return result

            }catch(error){
                return null;
            }
        }
        throw fetched
    }catch(error){
        
        // showMessage({message:error.type + ' - ' + error.status, type:'error'})
        throw error.text
    }
}

export async function del(endpoint){
    try{
        const fetched = await fetch(HOST+API+endpoint, {method:'DELETE', headers: headers})
        
        if (fetched.ok){
            try{
                const result = await fetched.json();
                return result

            }catch(error){
                return null;
            }
        }
        throw fetched
    }catch(error){
      
        throw error
    }
}

export async function get_params(endpoint, paramsMap){
    
    let params = Object.entries(paramsMap).map(a => a.join('='));
     try{
        let url = HOST+API+endpoint+'?'+params.join('&')
        
         const fetched = await fetch(url, {method:'GET', headers: headers})
        
        if (fetched.ok){
            try{
                const result = await fetched.json();
                return result

            }catch(error){
                return null;
            }
        }
        throw fetched
    }catch(error){
        
        // showMessage({message:error.type + ' - ' + error.status, type:'error'})
        throw error
    }
}

export async function post(endpoint, body) {
    if(body.id) body.id = body.id.toString()
    try {
      const fetched = await fetch(HOST + API + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
  
      if (fetched.ok) {
        try {
          const result = await fetched.json();
          return result;
        } catch (error) {
          return null;
        }
      } else {
        // Handle non-200 status codes
        const errorResponse = await fetched.json();
        throw new Error(`Request failed with status ${fetched.status}: ${errorResponse.message}`);
      }
    } catch (error) {
      // showMessage({ message: error.type + ' - ' + error.status, type: 'error' });
      throw error;
    }
  }

export async function login_user(login, password){
    
    try{
        const fetched = await fetch(HOST+API+'user/login?login='+login+'&password='+password, {method:'POST', headers: headers, body:JSON.stringify({"login":login, "password":password})})
        
        if (fetched.ok){
            try{
                const result = await fetched.json();
                return result

            }catch(error){
                return null;
            }
        }
        throw fetched
    }catch(error){
        
        throw error
    }
}

export async function uploadFile(endpoint, file, pi) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", pi);
    
    try {
      const response = await fetch(HOST+API+endpoint, {
        method: "POST",
        body: formData,
        headers:headers
      });
  
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error("Failed to upload file");
      }
    } catch (error) {
      console.error(error);
        throw error

    }
  }
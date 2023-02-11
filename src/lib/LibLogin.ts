import LibConfig from './LibConfig';
import LibDbSession from './LibDbSession';

const LibLogin = {
  /**
  * login
  * @param
  *
  * @return
  */ 
  login : async function () {
    try {
      const password = document.querySelector<HTMLInputElement>('#password');
      const email = document.querySelector<HTMLInputElement>('#email');
      const item = {
        email: email?.value,
        password: password?.value,
      }
      const res = await fetch(LibConfig.API_URL + "/users/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: JSON.stringify(item),
      });
      const json = await res.json();
console.log(json);      
      if (res.status !== 200) {
        console.error("status <> 200");
        throw new Error(await res.text());
      }
      if (json.ret !== 'OK') {
        alert("Error, login")
        return
      }   
      const key = LibConfig.SESSION_KEY_USER;     
      const user = json.data;
//console.log(key, user);
      user.password = "";     
      await LibDbSession.set(key, user);
      window.location.href = '/';	
    } catch (error) {
        console.error(error);
    }     
  } 
}

export default LibLogin;

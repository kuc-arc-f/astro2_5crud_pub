import LibAuth from '../../lib/LibAuth';
import LibConfig from '../../lib/LibConfig';

const User = {
  /**
   * create:
   * @param key: any
   *
   * @return
   */
  create : async function() : Promise<any>
  {
    try{
      const name = document.querySelector<HTMLInputElement>('#name');
      const password = document.querySelector<HTMLInputElement>('#password');
      const email = document.querySelector<HTMLInputElement>('#email');
      const item = {
        name: name?.value,
        email: email?.value,
        password: password?.value,
      }
      const url = LibConfig.API_URL + "/users/add";
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: JSON.stringify(item),
      });
      const json = await res.json();
console.log(json);   
      if (res.status != 200) {
        throw new Error(await res.text());
      } 
      window.location.href = '/login';	
    } catch (e) {
      console.error(e);
    }
  },
}

export default User;

import LibAuth from './LibAuth';
import LibConfig from './LibConfig';

const LibCrud = {
  /**
   * validLogin:
   * @param key: any
   *
   * @return
   */  
  validLogin : async function() : Promise<any>
  {
    console.log("#validLogin");
    let ret = false;
    const validLogin: boolean = await LibAuth.validLogin();
    if(validLogin !== false) {
      ret = true;
    }
    return ret;
  },
  /**
   * getList:
   * @param key: any
   *
   * @return
   */  
  getList : async function() : Promise<any>
  {
    try{
      let items: any[] = [];
      const url = LibConfig.API_URL + "/chats/index";
      const response = await fetch(url);
      const json = await response.json();
      items = json.data;
console.log(items);
      return items;
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * get:
   * @param key: any
   *
   * @return
   */      
  get : async function(id: number) : Promise<any>
  {
    try{
      let item: any = {};
      const url = LibConfig.API_URL + "/chats/show/" + String(id);
      const response = await fetch(url);
      const json = await response.json();
      item = json.data;
//console.log(item);
      return item;
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * addItem:
   * @param key: any
   *
   * @return
   */  
  addItem : async function() : Promise<any>
  {
    try{
      const name = document.querySelector<HTMLInputElement>('#name');
      const url = LibConfig.API_URL + "/chats/create";
//console.log(url);
      const item = {
        name: name?.value,
        content : '',
        userId:  0,
      }
//console.log(item);
      const body = JSON.stringify(item);		
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
console.log(json);   
      if (res.status !== 200) {
        throw new Error(await res.text());
      }      
      window.location.href = '/crud';	
    } catch (e) {
      console.error(e);
    }
  },
}

export default LibCrud;

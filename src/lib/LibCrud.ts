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
  /**
   * delete:
   * @param key: any
   *
   * @return
   */   
  delete : async function(id: number) : Promise<any>
  {
    try{
      let ret = {};
      const item = {
        id: Number(id),
      }
//console.log(item);
      const response = await fetch(LibConfig.API_URL + "/chats/delete", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });       
      const json = await response.json();
console.log(json.data);
      if(json.ret !== LibConfig.OK_CODE) {
        throw new Error(await response.text());
      }
      ret = json.data;
      window.location.href = '/crud';	
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * update:
   * @param key: any
   *
   * @return
   */   
  update : async function() : Promise<any>
  {
    try{
      const elm: any = document.querySelector('#item_id');
      const id = elm?.value;      
      const name = document.querySelector<HTMLInputElement>('#name');
      const item = {
        name: name?.value,
        content : '',
        id: Number(id),
      }
//console.log(item);
      const res = await fetch(LibConfig.API_URL + "/chats/update", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });      
      const json = await res.json();
      console.log(json);
      if(json.ret !== 'OK'){
        throw new Error('Error , update');
      }
      window.location.href = '/crud';	
    } catch (e) {
      console.error(e);
    }
  },
}

export default LibCrud;

import Cache from "./cache";
import * as config from "./config";

module.exports = {
  async fetchData(url, request, cb) {
    try {
      let response = await fetch(url, request);
      let responseJson = await response.json()
      if (response.status == 200) {
        cb(null, responseJson);
      } else {
        cb(responseJson);
      }
    } catch (error) {
      console.log('----', url)
      cb(error);
    }
  },
  async middleware(url, request, cb) {  
      this.fetchData(url, request, cb)
  },
  baseApi(sub_url, method, json_data, cb) {
   
    let request = {
      method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: Cache.currentUser
          ? "bearer " + Cache.token
          : null,
      }
    };
    if (method == "POST" || method == "PUT") {
      request["body"] = JSON.stringify(json_data);
    }else{
      // sub_url += '&t='+(new Date()).getTime()
    }

    this.middleware(config.SERVICE_API_URL + sub_url, request, cb);
  },

  /////////////////////////
  //////// Account ////////
  /////////////////////////
  login(username, password, cb) {

    this.baseApi("login", "POST", { username, password }, cb);
  },

  signup( password_confirmation, password, phone, last_name, first_name, email ,signup_type, title, cb){
    this.baseApi('register', 'POST', { password_confirmation, password, phone, last_name, first_name, email ,signup_type, title }, cb)
  },



  

  




















};

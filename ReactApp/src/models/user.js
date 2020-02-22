
import API  from '../Services/config';

export default class User {
  constructor(
    name = null,
    email = null,
    password = null,
    apiUrl = API,
  ) 
  {
    this.name = name;
    this.email = email;
    this.password = password;
    this.apiUrl = apiUrl;
  }
}
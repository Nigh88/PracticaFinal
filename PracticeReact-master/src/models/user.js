
import API  from '../Services/config';

export default class User {
  constructor(
    name = null,
    surname = null,
    email = null,
    password = null,
    apiUrl = API,
  ) 
  {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.apiUrl = apiUrl;
  }
}
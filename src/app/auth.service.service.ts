import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  private authTokenKey ='authToken';
  isAuthenticated():boolean{
    const token = localStorage.getItem('usuario');
    return !!token;
  }

  storeToken(token:string):void{
    const encodedToken = btoa(token);
    localStorage.setItem('usuario',encodedToken);
  }
  removeToken(){
    localStorage.removeItem('usuario');
  }
}

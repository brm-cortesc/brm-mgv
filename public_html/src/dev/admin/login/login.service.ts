export class LoginAdminService {
  constructor() {}

  validateSession():boolean{
    if (this.getSession() == null || this.getSession().id == "") {
      return false;
    }else{
      return true;
    }
  }

  public getSession():any{
    return JSON.parse( window.localStorage.getItem('!us3r4dmIW3j0rn#'));
  }

  public setSession(data:any):any{
    window.localStorage.setItem('!us3r4dmIW3j0rn#', JSON.stringify(data));
  }

  public deleteSession():any{
    window.localStorage.removeItem('!us3r4dmIW3j0rn#');
  }

}
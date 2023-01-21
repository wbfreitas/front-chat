import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable()
export class AuthGuardServiceService implements CanActivate  {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    
    if(!localStorage.getItem("token")) {
    this.router.navigate(['login']); 
     return false;
    }
    return true;
  }
}

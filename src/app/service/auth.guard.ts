import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const ftag = `canActivate(),`;
      
    if (this.auth.isLoggedIn()) {
      return true;
    }

    // console.log(ftag, 'before gotoLogin()');
    this.auth.gotoLogin();
    return false;
  }
}

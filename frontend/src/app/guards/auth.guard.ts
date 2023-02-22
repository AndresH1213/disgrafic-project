import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlSegment,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return !this.authService.hasToken();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return !this.authService.hasToken();
  }
}

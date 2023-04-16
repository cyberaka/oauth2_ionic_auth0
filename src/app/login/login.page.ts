import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DialogService } from '../services/dialog.service';
import { UtilsService } from '../services/utils.service';
import { AuthService } from '@auth0/auth0-angular';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { switchMap } from 'rxjs';
import { environment } from '../../environments/environment';


let window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  pageTitle: string = 'Login';
  loading: boolean = true;
  user$ = this.auth.isAuthenticated$.pipe(switchMap(() => this.auth.user$));
  isAuthenticated: boolean = false;
  constructor(
    private router: Router,
    private dialog: DialogService,
    private http: HttpService,
    private utils: UtilsService,
    public auth: AuthService
  ) {}



  /**
   * Login clicked Hit the API Based on response redirected to Topics screen
   *
   */
  async login() {
    if (Capacitor.isNativePlatform()) {
      this.auth
        .loginWithRedirect({
          async openUrl(url: string) {
            const res = await Browser.open({ url, windowName: '_self' });
            console.log(res);
          },
        })
        .subscribe();
    } else {
      this.auth.loginWithRedirect().subscribe((c) => {
        console.log('loginWithRedirect');
        console.log(c);
      });
    }
  }

  logout() {
    let returnTo = environment.auth.authorizationParams.redirect_uri;
    if (Capacitor.isNativePlatform()) { 
      this.auth
      .logout({ 
        logoutParams: {
          returnTo
        },
        async openUrl(url: string) {
         await Browser.open({ url, windowName: '_self' })} 
      })
      .subscribe();
    } else {
      this.auth
      .logout({ 
        logoutParams: {
          returnTo
        },
      }).subscribe();
    }
     
  }
}

import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


let window: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  pageTitle: string = 'Login';
  loading: boolean = true;

 
  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    this.getDetails();
  }

  getDetails() {
    this.auth.isAuthenticated$.subscribe((res) =>{
      if(res) {
        this.router.navigateByUrl('profile', {replaceUrl : true});
      } else {
        this.loading = false;
      }
    });
  }



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
        this.auth.isAuthenticated$.subscribe((res) => {
          if (res) {
            alert(res);
          }
        });
      });
    }
  }

 
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Capacitor } from '@capacitor/core';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { switchMap } from 'rxjs';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent  implements OnInit {
  activeSegmentBtn = 'token';
  user$ = this.auth.isAuthenticated$.pipe(switchMap(() => this.auth.user$));
  token = '';
  isToastOpen: boolean = false;
  decryptToken:any;
  toastTxt = '';
  constructor(
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.auth.getAccessTokenSilently().subscribe((token) => {
      this.token = token;
      this.decryptToken = JSON.parse(atob(token.split('.')[1]));
      console.log(this.decryptToken);
    })
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

  segmentChange() {
    if(this.activeSegmentBtn == 'token') {
      this.activeSegmentBtn = 'decodeToken';
    } else {
      this.activeSegmentBtn = 'token';
    }
  }

  async clipBoardCopy() {
    let text = '';
     if(this.activeSegmentBtn == 'token') {
      this.toastTxt = 'Auth0 Token copied';
      text = this.token; 
    } else {
      this.toastTxt = 'Auth0 Decrypted Token copied';
      text = JSON.stringify(this.decryptToken);
    }
    await Clipboard.write({
      string: text.toString()
    });
    this.isToastOpen= true;
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
}

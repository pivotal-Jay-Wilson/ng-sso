import { Component, OnInit } from '@angular/core';
import * as ClientOAuth2 from 'client-oauth2';
import {
  clientId,
  clientSecret,
  wellknown,
  scopes,
  rejectUnauthorized
} from '../config.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  loggedin = false;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.checkLogin().then(() => {
      return;
    });
  }
  async checkLogin() {
    const openidConfig: any = await this.http.get(wellknown).toPromise();
    const auth = new ClientOAuth2({
      clientId,
      clientSecret,
      accessTokenUri: openidConfig.token_endpoint,
      authorizationUri: openidConfig.authorization_endpoint,
      redirectUri: `${window.location.origin}/login`,
      scopes
    });
    const user = await auth.code.getToken(`${window.location.href}}`);
    const base64Url = user.accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const { user_name } = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );
    this.username = user_name;
    const u = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    );
    console.log(u);
    this.loggedin = true;
  }
}

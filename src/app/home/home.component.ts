import { Component, OnInit } from '@angular/core';
import { clientId, clientSecret, wellknown, scopes, rejectUnauthorized } from '../config.json';
import * as ClientOAuth2 from 'client-oauth2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) {

      console.log(window.location);
  }

  ngOnInit() {
  }

  async login() {
    // const openidConfig = await this.axios.get(wellknown);
    const openidConfig: any = await this.http.get(wellknown).toPromise();
    console.log(JSON.stringify(openidConfig));

    const auth = new ClientOAuth2({
      clientId,
      clientSecret,
      accessTokenUri: openidConfig.token_endpoint,
      authorizationUri: openidConfig.authorization_endpoint,
      redirectUri: `${window.location.protocol}//${window.location.hostname}/login`,
      scopes
    });
    console.log(auth.code.getUri());
    window.open(auth.code.getUri(), '_self');
 }


}

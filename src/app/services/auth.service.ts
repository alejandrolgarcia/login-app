import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.models';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDHvyW8GdXmQ_gdbb3MePqv_4AiTrYZifo';

  userToken: string;

  // Crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {
    this.leerToken();
  }

  logout() { }

  login( usuario: UsuarioModel ) {

    // Request Body Payload
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    // You can sign in a user with an email and password by issuing an HTTP POST
    // request to the Auth verifyPassword endpoint.
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {
        console.log('Entro en el mapa del RXJX');
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel ) {

    // Request Body Payload
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    // You can create a new email and password user by issuing an HTTP POST
    // request to the Auth signupNewUser endpoint
    return this.http.post(
      `${this.url }signUp?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entro en el mapa del RXJX');
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

}

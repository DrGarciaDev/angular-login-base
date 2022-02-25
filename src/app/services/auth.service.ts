import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost/api-laravel-jwt/public';
  userToken: string;

  constructor( private http: HttpClient) {
    this.leerToken();
  }

  logout () {

  }

  login ( usuario: UsuarioModel ) {
    const authData = {
      // ...usuario,
      email: usuario.email,
      password: usuario.password
    }

    return this.http.post(
      `${this.url}/api/auth/login`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entró en el mapa del RXJS');
        this.guardarToken( resp['token'] );
        return resp;
      })
    );
  }

  nuevoUsuario ( usuario: UsuarioModel ) {
    const authData = {
      // ...usuario,
      email: usuario.email,
      name: usuario.name,
      password: usuario.password
    }

    return this.http.post(
      `${this.url}/api/auth/register`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entró en el mapa del RXJS');
        this.guardarToken( resp['token'] );
        return resp;
      })
    );
  }

  private guardarToken ( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken () {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    }
    else {
      this.userToken = '';
    }

    return this.userToken;
  }
}

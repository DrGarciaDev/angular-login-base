import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost/api-laravel-jwt/public';

  constructor( private http: HttpClient) { }

  logout () {

  }

  login ( usuario: UsuarioModel ) {

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
    );
  }
}

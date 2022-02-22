import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = '';

  constructor( private http: HttpClient) { }

  logout () {

  }

  login ( usuario: UsuarioModel ) {

  }

  nuevoUsuario ( usuario: UsuarioModel ) {

  }
}

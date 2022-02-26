import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  
  constructor( private auth: AuthService, 
                private router: Router ) { }

  ngOnInit() {
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login ( form: NgForm ) {

    if ( form.invalid ) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Ingresando...'
    });
    Swal.showLoading();

    // console.log(form);
    // console.log(this.usuario);

    this.auth.login( this.usuario )
    .subscribe( respuesta => {
      console.log(respuesta);
      Swal.close();

      if ( this.recordarme ) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (errorAuth) => {
      console.log(errorAuth)
      Swal.fire({
        type: 'error',
        text: errorAuth.error.error,
      });
    });
  }
}

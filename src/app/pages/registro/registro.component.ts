import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService, 
                private router: Router) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();

    this.usuario.email = 'luis@gmail.com';
    
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  onSubmit( form: NgForm ) {

    if (form.invalid) {
      return;
    }
    // console.log('Formulario enviado')
    // console.log(this.usuario)
    // console.log( form )

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Registrando usuario...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario )
    .subscribe( respuesta => {
      console.log(respuesta);
      Swal.close();

      if ( this.recordarme ) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/home');

    }, (errorAuth) => {
      console.log(errorAuth.error.message)

      Swal.fire({
        type: 'error',
        text: errorAuth.error.message
      });
    });
  }
}

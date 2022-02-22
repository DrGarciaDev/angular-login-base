import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();

    this.usuario.email = 'luis@gmail.com';
  }

  onSubmit( form: NgForm ) {

    if (form.invalid) {
      return;
    }
    // console.log('Formulario enviado')
    // console.log(this.usuario)
    // console.log( form )

    this.auth.nuevoUsuario( this.usuario )
    .subscribe( respuesta => {
      console.log(respuesta);
    }, (errorAuth) => {
      console.log(errorAuth.error.message)
    });
  }
}

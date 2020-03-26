import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Alerta',
      text: 'Espere un momento...',
      icon: 'success'
    });

    Swal.showLoading();

    this.auth.login( this.usuario )
      .subscribe( resp => {

        console.log( resp );
        Swal.close();
        this.router.navigateByUrl('/home');

      }, (err) => {

        Swal.fire({
          title: 'Error de autenticación',
          text: err.error.error.message,
          icon: 'error'
        });

        console.log(err.error.error.message);

      });

  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;


  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    this.usuario = new UsuarioModel();

  }

  onSubmit( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Nueva cuenta',
      text: 'Espere un momento...',
      icon: 'success'
    });

    Swal.showLoading();

    this.auth.nuevoUsuario( this.usuario )
      .subscribe( resp => {

        console.log( resp );
        Swal.close();
        this.router.navigateByUrl('/home');

      }, (err) => {

        Swal.fire({
          title: 'Error al registrar nueva cuenta',
          text: err.error.error.message,
          icon: 'error'
        });
        console.log(err.error.error.message);
      });
  }


}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder,
               private validadores: ValidadoresService ) {

    this.crearFormulario();
    this.cargarDataAlFormulario();

   }

  ngOnInit(): void {
  }

  // Grupo de funciones GET que validan si un campo tiene info o si ha sido tocado
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }

  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return ( pass1 === pass2 ) ? false : true;
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }


 /**
  * Función que controla los campos del formulario, validaciones y otros
  */
  crearFormulario() {

    this.forma = this.fb.group({
      nombre  : ['', [ Validators.required, Validators.minLength(3)] ],
      apellido: ['', [ Validators.required, Validators.minLength(3), this.validadores.noApellido ] ],
      correo  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      pass1   : ['', [ Validators.required, Validators.minLength(5) ] ],
      pass2   : ['', [ Validators.required, Validators.minLength(5) ] ],
      direccion: this.fb.group({
        distrito: ['', Validators.required ],
        ciudad  : ['', Validators.required ]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  // Boton que agrega nueva fila de pasatiempo en la tabla
  agregarPasatiempo() {
    this.pasatiempos.push( this.fb.control('', Validators.required));
  }

  // Boton que borra un elemento de la lista de pasatiempos
  borrarPasatiempos( i: number ) {
    this.pasatiempos.removeAt(i);
  }

  // Boton que guarda los datos del formulario
  guardar() {
    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
  }

  // Permite tener datos seteados al enviase la informacion (se usa como reset de formulario)
  cargarDataAlFormulario() {

    this.forma.reset({
      nombre: 'Luis',
      apellido: 'Ardila',
      correo: 'lardila@gmail.com',
      direccion: {
        distrito: 'Santiago CL',
        ciudad: 'La Reina'
      }
    });
  }

  // Posteo de la informacion


}

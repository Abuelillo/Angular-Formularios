import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { FormGroup, FormBuilder, Validators, FormGroupName, FormArray } from '@angular/forms';
import { ValidadorsService } from '../../services/validadors.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.less']
})
export class ReactiveComponent implements OnInit {

  forma:FormGroup;

  constructor(private fb:FormBuilder ,private paisService:PaisService,private validadores:ValidadorsService) { 
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray
  }
  //VALIDACION CAMPOS
  /*
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  */
 
  validar(camp:string){    
    if (camp === 'pass2') {
      const pass1 = this.forma.get('pass1').value;
      const pass2 = this.forma.get('pass2').value;
      return (pass1 === pass2) ? false: true;
    } else {     
      return this.forma.get(camp).invalid && this.forma.get(camp).touched;
    }    
  }
  // FIN VALIDACION

  crearFormulario(){
    this.forma = this.fb.group({
      //[valor por defecto, validadores sincronos, validadores asincronos]
      nombre:['',[Validators.required,Validators.minLength(5)]],
      apellido:['',[Validators.required,this.validadores.noHerrera]],
      correo:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z09.-]+\.[a-z]{2,3}$')]],
      usuario:['',Validators.required ,this.validadores.existeUsuario],
      pass1:['',Validators.required],
      pass2:['',Validators.required],
      direccion: this.fb.group({
        distrito:['',Validators.required],
        ciudad:['',Validators.required]
      }),
      pasatiempos: this.fb.array([])
    },{
      validators: this.validadores.passwordsIguales('pass1','pass2')
    });
  }

  cargarDataFormulario(){
    //this.forma.setValue( -> todo el objeto completo
    this.forma.reset({// -> no es necesario rellenar el objeto
      nombre: "joselino",
      apellido: "pan y vino",
      correo: "poseso@panyvino.com",
      pass1:'123',
      pass2:'123',
      direccion: {
        distrito: "2",
        ciudad: "lugo"
      }      
    });

    ['comer','dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  guardar(){
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control=>{
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control =>{control.markAsTouched();})
        }else{
          control.markAsTouched();
        }
      });      
    }

   
    //post formulario
    this.forma.reset();

  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control('',Validators.required));
  }

  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }

  crearListeners(){
    /*this.forma.valueChanges.subscribe(valor => {
      console.log(valor)
    });
    this.forma.statusChanges.subscribe(valor => {
      console.log(valor)
    })*/
    this.forma.get('nombre').valueChanges.subscribe(valor => {
      console.log(valor)
    })
  }
}

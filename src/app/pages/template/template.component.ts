import { Component, OnInit } from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.less']
})
export class TemplateComponent implements OnInit {

  usuario= {
    nombre:'juanillo',
    apellido:'arandanos',
    correo:'pepe@gmail.com',
    pais:'ESP',
    genero:'M'
  };
  paises:any[] = [];

  constructor(private paisService:PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises().subscribe(resp=>{
      this.paises = resp;
      this.paises.unshift({nombre:'[Selecciones Pais]',codigo:''})
    });
  }

  guardar(forma: NgForm){
    

    if (forma.invalid) {
      Object.values(forma.controls).forEach(control=>{
        control.markAsTouched();
      });
      return;
    }
    console.log(forma.value);
  }
}

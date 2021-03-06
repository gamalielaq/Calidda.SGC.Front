import { Component, OnInit } from '@angular/core';

interface Demo {
  name: string;
  code: string;
}

interface Demo2 {
  name2: string;
  code2: string;
}

@Component({
  selector: 'app-crear-comite',
  templateUrl: './crear-comite.component.html',
  styleUrls: ['./crear-comite.component.scss'],
})
export class CrearComiteComponent implements OnInit {
  
  activeIndex: number = 0;

  // dropdown demo
  empresa: Demo[];
  selectedDemo1: Demo;

  selectedCountry:string;
  countries:any[];
  displayModal: boolean;

  constructor() {}

  ngOnInit(): void {
    this.empresa = [
      { name: 'Calidda', code: 'NY' },
      { name: 'Calidda 2', code: 'RM' },
      { name: 'Calidda 3', code: 'LDN' },
    ];

  
    this.countries = [
      {name: 'PERÚ', code: 'PE'},
    ];

  }

  // dialog crear
  showModalDialog() {
    this.displayModal = true;
  }
}
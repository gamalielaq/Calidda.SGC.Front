import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserRequestModel } from 'src/app/models/user.model';
import { EmpresaServices } from 'src/app/services/empresa.service';
import { PaisServices } from 'src/app/services/pais.service';
import { UserServices } from 'src/app/services/user.service';
import { AppConstants } from 'src/app/shared/constants/app.constants';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  values:string;
  checked:boolean;
  displayModal:boolean;
  selectedCountry = {};
  countries:any[];
  valida:boolean=false;
  dataRol: any[];
  selectedRol:string;
  dataEmpresa:any[];
  selectedEmpresa:string;
  userForm:FormGroup;
  submitted: boolean = false;
  
  constructor(
    private paisServices:PaisServices,
    private empresaServices:EmpresaServices,
    private fb :FormBuilder,
    public messageService:MessageService,
    public config: DynamicDialogConfig,
    private userServices:UserServices,
    public ref: DynamicDialogRef
  )
  {}
  
  ngOnInit(): void {
    this.crearFormulario();
    this.listarPais();
    this.dataRol = [
      {name: 'Admin', code: 'AD'}
    ];
    this.getListCompany();
    if(this.config.data == null){
      this.valida = true;
    }else{
      this.valida = false;
      this.UpdateFormulario();
    }
  }

  crearFormulario(){
    this.userForm = this.fb.group({
      empresaId: ['', [Validators.required]],
      nombre: ['', [Validators.required,  Validators.minLength(1)]],
      paisId: ['', [Validators.required]],
      correo: ['', [Validators.required,  Validators.minLength(1)]],
      celular: ['', [Validators.required,  Validators.minLength(9)]],
    });
  }

  get g() { return this.userForm.controls; }

  UpdateFormulario(){
    this.userForm.patchValue({
      nombre: this.config.data.nombre,
      paisId: this.config.data.paisId
    })
    this.selectedCountry = {paisId: this.config.data.paisId,nombre: this.config.data.paisDto.nombre}
  }

  showWarn(mensaje :string) {
    this.messageService.add({severity:'warn', summary: AppConstants.TitleModal.Warning, detail: mensaje});
  }
  
  showModalDialog() {
    this.submitted = true;

    if (this.userForm.valid) {

      if (!this.userForm.controls.nombre.valid ||
        !this.userForm.controls.empresaId.valid ||
        !this.userForm.controls.celular.valid ||
        !this.userForm.controls.correo.valid ||
        !this.userForm.controls.paisId.valid) {
        this.showWarn(AppConstants.MessageModal.FIELD_ERROR);
        return false;
      }

      if(this.valida){
        //CREATE
        let data = this.userForm.value;
        var odata = new UserRequestModel();
        odata.nombre = data.nombre;
        odata.estado = 1 ;
        odata.empresaId= data.empresaId.empresaId;
        odata.celular  = data.celular;
        odata.correo  = data.correo;
        odata.personaId  = 0;
        odata.usuarioId  = 0;
        
        this.userServices.addUser(odata).subscribe(
          (response: any) => {
            this.displayModal = true;
          }
        )
      }
    }else {
      this.userForm.markAllAsTouched();
      this.showWarn(AppConstants.MessageModal.FIELD_ERROR);
    }
  } 

  getListCompany(){
    this.empresaServices.getListEmpresa("ALL1",0,0).subscribe(
      (response: any) => {
        console.log(response);
        this.dataEmpresa = response.data
      }
    )
  }

  eventClose(){
    this.displayModal = false;
    this.ref.close(true);
  }

  listarPais(){
    this.paisServices.getListPais().subscribe(
      (response: any) => {
        this.countries = response.data;
      }
    )
  }

}

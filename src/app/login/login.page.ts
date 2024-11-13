import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { NavigationExtras, Router }  from '@angular/router';
import { HomePage } from '../home-estudiante/home.page';
import { ApiService } from '../api-service-dbjson.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  @ViewChild('logo', { read: ElementRef, static: true }) logo!: ElementRef;

  

  formularioLogin: FormGroup;
  

  constructor(public fb:FormBuilder,
    public alertController: AlertController,
    public router: Router ,
    public toastController: ToastController,
    private apiService: ApiService,
  ) { 
    this.formularioLogin=this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })
  }
  

  ngOnInit() {
    
    
  }


  async ingresar() {
    var f = this.formularioLogin.value;

    this.apiService.getUsuarios().subscribe((usuarios) =>{
      const usuario = usuarios.find((user: any) => user.nombre == f.nombre && user.password == f.password);
      if(usuario){
        if(usuario.rol =='Estudiante'){
          this.router.navigate(['/home']);
        }else if (usuario.rol == 'Docente'){
          this.router.navigate(['home-docente']);
        }
      }else {
        this.presentToast("Usuario no encontrado");
      }
      
    },async(error) =>{
      const alert = await this.alertController.create({
        message: 'Error al acceder a los usuarios',
        buttons: ['Aceptar']
      });
      await alert.present();
    });
  
  }
  
  
  
  async presentToast(message:string, duration?:number){
    const toast = await this.toastController.create(
      {
        message:message,
        duration:duration?duration:2000
      }
    );
    toast.present();
  }

  

}
  



import { AfterViewInit, Component, OnInit, ViewChild, viewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../api-service-dbjson.service';
import { ActionSheetController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit, AfterViewInit {
  @ViewChild('modal', { static: true }) modal!: IonModal;
  presentingElement: HTMLElement | null = null;
  formularioRegistro:FormGroup;
  formRecuperar: FormGroup<{ nombre: FormControl<string | null>; }>;
  

  constructor(public fb:FormBuilder,
    public alertController:AlertController,
    private navCtrl : NavController,
    public toastController : ToastController,
    private apiService : ApiService,
    private actionSheetCtrl: ActionSheetController,
  ) {
    this.formularioRegistro=this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'rol': new FormControl("",Validators.required), 
      'confirmacionPassword': new FormControl("",Validators.required)
    });
    this.formRecuperar = this.fb.group({
      'nombre': new FormControl("",Validators.required)
    });

   }
  ngAfterViewInit(): void {
    this.presentingElement = document.querySelector('moda-recuperar');
  }


   
  

  ngOnInit() {
   
  }

  goBack() {
    this.navCtrl.back();
  }


  async guardar() {
    const f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        message: 'Se deben llenar todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const nuevoUsuario = {
      nombre: f.nombre,
      password: f.password,
      rol: f.rol
    };

    this.apiService.crearUsuario(nuevoUsuario).subscribe(
      async (response) => {
        const toast = await this.toastController.create({
          message: "Usuario creado correctamente",
          duration: 2000
        });
        toast.present();

        this.navCtrl.navigateBack('/login');
        this.presentToast("Usuario creado correctamente")
      },
      async (error) => {
        console.error('Error al crear el usuario:', error);
        const alert = await this.alertController.create({
          message: 'Hubo un error al crear el usuario.',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    );
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


  async recuperarPassword() {
    const f = this.formRecuperar.value;
    
   if (!f.nombre) {
      const alert = await this.alertController.create({
        message: 'Por favor, ingrese su nombre de usuario.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }


    // Llamada al servicio para recuperar el usuario
    this.apiService.getUsuarioByNombre(f.nombre).subscribe(
      async (usuario) => {
        if (usuario.length > 0) { // El usuario se encontró
          const alert = await this.alertController.create({
            message: `Su contraseña es: ${usuario[0].password}`,
            buttons: ['Aceptar']
          });
          await alert.present();
        } else {
          const alert = await this.alertController.create({
            message: 'El nombre de usuario no existe.',
            buttons: ['Aceptar']
          });
          await alert.present();
        }
      },
      async (error) => {
        const alert = await this.alertController.create({
          message: 'Hubo un error al buscar el usuario.',
          buttons: ['Aceptar']
        });
        await alert.present();
        console.error(error);
      }
    );
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Estas seguro?',
      buttons: [
        {
          text: 'Si',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };








}

import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { QrCodeModule } from 'ng-qrcode';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {
  codigoQR : string | null = null;
  private dbUrl = 'http://localhost:3000/clases';
 

  constructor(
    private navCtrl : NavController,
    public toastController: ToastController,
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  generarQR(clases: string):void {
    const timestamp = new Date().toISOString();
    this.codigoQR = `${clases}-${timestamp}`;

    const nuevaClase = { clases, qr: this.codigoQR};
    this.http.post(this.dbUrl, nuevaClase).subscribe(
      (response) => {
        this.presentToast("clase creada con exito");
        console.log("Clase creada:", response);
        
      },
      (error) => {
        this.presentToast("Error al crear la clase");
        console.error("Error al crear la clase:", error);
      }
    )
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


  goBack() {
    this.navCtrl.back();
  }

}

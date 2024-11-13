import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  

  constructor(
    private navCtrl : NavController,
    private qrScanner: QRScanner,
    private plataform: Platform,
  ) { }

  ngOnInit() {
  }

  scanQRCode() {
    this.plataform.ready().then(() => {
      this.qrScanner.prepare().then((status: QRScannerStatus) => {
        if (status.authorized) {
          // La cámara está lista, empieza a escanear
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something: ', text);
            // Aquí puedes manejar el resultado del escaneo
            this.qrScanner.hide(); // Oculta la cámara
            scanSub.unsubscribe(); // Desuscribirse para evitar fugas de memoria
          });

          this.qrScanner.show(); // Muestra la cámara
        } else if (status.denied) {
          console.log('La cámara ha sido denegada');
        } else {
          console.log('La cámara no está autorizada, pero se puede habilitar en la configuración');
        }
      });
    });
  }


  
  goBack() {
    this.navCtrl.back();
  }





}

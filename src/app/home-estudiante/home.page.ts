import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';

import { Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  scanResult = "";

  constructor(
    private navCtrl : NavController,
    private plataform: Platform,
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }



  async Scaner() {
    const modal = await this.modalController.create({
    component: BarcodeScanningModalComponent,
    cssClass: 'barcode-scanning-modal',
    showBackdrop: false,
    componentProps: { 
      formats: 'QR_CODE',
      LensFacing : LensFacing.Back,
    }
    });
  
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if(data){ await modal.onWillDismiss();
    this.scanResult = data?.barcode?.displayValue;
    console.log("Presente");
    this.presentToast("presente profe");
   }else{
    console.log("no presente");
    this.presentToast("no presente");
   }
  
  
  }

  ngOnInit() {

    if(this.plataform.is('capacitor')){

      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  


  
  goBack() {
    this.navCtrl.back();
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

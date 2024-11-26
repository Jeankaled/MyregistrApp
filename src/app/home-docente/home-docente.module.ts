import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeDocentePageRoutingModule } from './home-docente-routing.module';
import { HomeDocentePage } from './home-docente.page';
import { QrCodeModule } from 'ng-qrcode';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDocentePageRoutingModule,
    QrCodeModule
  ],
  declarations: [HomeDocentePage]
})
export class HomeDocentePageModule {}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Platform } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  

  constructor(
    private navCtrl : NavController,
    private plataform: Platform,
  ) { }

  ngOnInit() {
  }

  


  
  goBack() {
    this.navCtrl.back();
  }





}

import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
})
export class HomeDocentePage implements OnInit {

  constructor(private navCtrl : NavController,
  ) { }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.back();
  }

}

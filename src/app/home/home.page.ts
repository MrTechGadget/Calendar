import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { looseIdentical } from '@angular/core/src/util';

import { CalendarService } from '../calendar.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController, public calSvc: CalendarService, private plt: Platform) {
    this.plt.ready().then(() => {
      if (this.plt.is('ios')) {
        calSvc.createCal('O365');
      }
    });
  }

  openCal(cal) {
    this.navCtrl.navigateForward('CalDetailsPage/cal.name');
  }

}

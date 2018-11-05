import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Calendar } from '@ionic-native/calendar/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  calendars = [];

  constructor(public navCtrl: NavController, private calendar: Calendar, private plt: Platform) {
    this.plt.ready().then(() => {
      if (this.plt.is('ios')) {
        this.calendar.createCalendar('O365');
      }

      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      });
    });
  }

  addEvent(cal) {
    const date = new Date();
    const options = { calendarId: cal.id, calendarName: cal.name, url: cal.url, firstReminderMinutes: 15 };

    this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
    }, err => {
      console.log('err: ', err);
    });
  }

  openCal(cal) {
    this.navCtrl.navigateForward('CalDetailsPage/cal.name');
  }
}

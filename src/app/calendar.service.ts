import { Injectable } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public calName = 'O365';
  public calendars = [];

  constructor(public calendar: Calendar) { }

  addEvent(cal) {
    const date = new Date();
    const options = { calendarId: cal.id, calendarName: cal.name, url: cal.url, firstReminderMinutes: 15 };

    this.calendar.createEventInteractivelyWithOptions('My new Event', 'Münster', 'Special Notes', date, date, options).then(res => {
    }, err => {
      console.log('err: ', err);
    });
  }


  async createCal(cal) {
    try {
      const result = await this.calendar.createCalendar(cal);
      console.log(result);
      this.listCal();
    } catch (error) {
      console.log(error);
    }
  }

  listCal() {
    this.calendar.listCalendars().then(data => {
      this.calendars = data;
    });
  }

  async deleteCal(cal) {
    try {
      const result = await this.calendar.deleteCalendar(cal);
      console.log(result);
      this.listCal();
    } catch (err) {
      console.log(err);
    }
  }

}

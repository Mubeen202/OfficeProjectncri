import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { EventRef } from 'app/main/apps/calendar/calendar.model';
@Injectable()
export class CalendarService implements Resolve<any> {
  // Public
  public events;
  public calendar;
  public currentEvent;
  public tempEvents;
  public value: any;

  public onEventChange: BehaviorSubject<any>;
  public onCurrentEventChange: BehaviorSubject<any>;
  public onCalendarChange: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    this.onEventChange = new BehaviorSubject([]);
    this.onCurrentEventChange = new BehaviorSubject([]);
    this.onCalendarChange = new BehaviorSubject([]);
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getEvents(this.value), this.getCalendar()]).then(
        (res) => {
          resolve(res);
        },
        reject
      );
    });
  }

  /**
   * Get Events
   */
  getEvents(value): Promise<any[]> {
    const url = `api/calendar-events`;
    const apiUrl = `${environment.apiUrl}/gettingCalenderRecords`;

    return new Promise((resolve, reject) => {
      this._httpClient.post(apiUrl, value).subscribe((response: any) => {
        this.events = response;
        console.log(
          '🚀 ~ file: calendar.service.ts:64 ~ CalendarService ~ this._httpClient.post ~ this.events',
          this.events
        );
        this.tempEvents = response;
        this.onEventChange.next(this.events);
        resolve(this.events);
      }, reject);
    });
  }

  getCandidateRecords(value): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`${environment.apiUrl}/gettingCalenderRecords`, value)
        .subscribe((response: any) => {
          this.events = response;
          this.onEventChange.next(this.events);
          resolve(this.events);
        }, reject);
    });
  }

  /**
   * Get Calendar
   */
  getCalendar(): Promise<any[]> {
    const url = `api/calendar-filter`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url).subscribe((response: any) => {
        this.calendar = response;
        this.onCalendarChange.next(this.calendar);
        resolve(this.calendar);
      }, reject);
    });
  }

  /**
   * Create New Event
   */
  createNewEvent() {
    this.currentEvent = {};
    this.onCurrentEventChange.next(this.currentEvent);
  }

  /**
   * Calendar Update
   *
   * @param calendars
   */
  calendarUpdate(calendars) {
    const calendarsChecked = calendars.filter((calendar) => {
      return calendar.checked === true;
    });

    let calendarRef = [];
    calendarsChecked.map((res) => {
      calendarRef.push(res.filter);
    });

    let filteredCalendar = this.tempEvents.filter((event) =>
      calendarRef.includes(event.calendar)
    );
    this.events = filteredCalendar;
    this.onEventChange.next(this.events);
  }

  /**
   * Delete Event
   *
   * @param event
   */
  deleteEvent(event) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .delete('api/calendar-events/' + event.id)
        .subscribe((response) => {
          this.getEvents(this.value);
          resolve(response);
        }, reject);
    });
  }

  /**
   * Add Event
   *
   * @param eventForm
   */
  addEvent(eventForm) {
    let url = JSON.parse(localStorage.getItem('candidateId'));
    const newEvent = new EventRef();
    newEvent.candidateId = url;
    newEvent.eventUrl = eventForm.url;
    newEvent.title = eventForm.title;
    newEvent.startDate = eventForm.start;
    newEvent.endDate = eventForm.end;
    // newEvent.allDay = eventForm.allDay;
    newEvent.lable = eventForm.selectlabel;
    newEvent.location = eventForm.location;
    newEvent.descriptions = eventForm.description;
    // newEvent.addGuest = eventForm.addGuest;
    newEvent.addGuest = '2d0ea1e6-add7-4df1-bb62-b6088fd9b402';
    this.currentEvent = newEvent;
    this.onCurrentEventChange.next(this.currentEvent);
    this.postNewEvent();
  }

  /**
   * Update Event
   *
   * @param eventRef
   */
  updateCurrentEvent(eventRef) {
    const newEvent = new EventRef();
    // newEvent.allDay = eventRef.event.allDay;
    newEvent.id = parseInt(eventRef.event.id);
    newEvent.eventUrl = eventRef.event.url;
    newEvent.title = eventRef.event.title;
    newEvent.startDate = eventRef.event.start;
    newEvent.endDate = eventRef.event.end;
    newEvent.lable = eventRef.event.calendar;
    newEvent.location = eventRef.event.location;
    newEvent.descriptions = eventRef.description;
    newEvent.addGuest = eventRef.event.addGuest;
    this.currentEvent = newEvent;
    this.onCurrentEventChange.next(this.currentEvent);
  }

  /**
   * Post New Event
   */
  postNewEvent() {
    let url = {
      candidateId: [JSON.parse(localStorage.getItem('candidateId'))],
    };
    const apiUrl = `${environment.apiUrl}/calender`;
    return new Promise((resolve, reject) => {
      this._httpClient.post(apiUrl, this.currentEvent).subscribe((response) => {
        // this.getEvents();
        this.getCandidateRecords(url);
        resolve(response);
        alert('Event Added');
        location.reload();
      }, reject);
    });
  }

  /**
   * Post Updated Event
   *
   * @param event
   */
  postUpdatedEvent(event) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post('api/calendar-events/' + event.id, { ...event })
        .subscribe((response) => {
          this.getEvents(this.value);
          resolve(response);
        }, reject);
    });
  }
}

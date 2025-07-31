import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../../interface/event';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class EventServiceService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  // this service is for sending data to event collection
  sendEventOrder(
    eventOrder:Event
  ): Observable<Event> {
    console.log('1')
    return this.http.post<Event>(
      `${this.apiUrl}/event/sendEventOrder`,
     eventOrder
    );
  }

  // get that all user even order

  eventOrder(email: Event['email']): Observable<Event[]> {
    return this.http.post<Event[]>(
      `${this.apiUrl}/event/eventOrder`,
      {email}
    );
  };
 
  // all event order

  allEventOrder(){
    return this.http.get(`${this.apiUrl}/event/allEventOrder`)
  };

  //updateEventStatus fpr update status

 updateEventStatus(_id: string, status: Event['status']): Observable<Event> {
  return this.http.patch<Event>(`${this.apiUrl}/event/updateEventStatus`, { _id, status });
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpService } from '../../interface/sp-service';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class SpServiceService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

uploadService(formData: FormData): Observable<{ data: SpService }> {
  return this.http.post<{ data: SpService }>(
    `${this.apiUrl}/service/uploadService`,
    formData
  );
}


  getAllServices(): Observable<{allService:SpService[]}> {
    return this.http.get<{allService:SpService[]}>(`${this.apiUrl}/service/getAllService`);
  }

 modifyService(updatedData: FormData): Observable<{ data: SpService }> {
  return this.http.patch<{ data: SpService }>(
    `${this.apiUrl}/service/modifyService`,
    updatedData
  );
}

  deleteService(_id: string): Observable<{result:SpService}> {
    return this.http.delete<{result:SpService}>(
      `${this.apiUrl}/service/deleteService/${_id}`
    );
  }
}

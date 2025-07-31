import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RentMaterial } from '../../interface/rent-material';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

postRentMaterial(formData: FormData): Observable<any> {
  return this.http.post<any>(
    `${this.apiUrl}/rent/sendRentMaterial`,
    formData
  );
}


  getUserRentOrder(email:RentMaterial['email']):Observable<RentMaterial[]>{
    return this.http.post<RentMaterial[]>(`${this.apiUrl}/rent/rentOrderUser`,{email})
  }

  fetchAllRentORder():Observable<RentMaterial[]>{
    return this.http.get<RentMaterial[]>(`${this.apiUrl}/rent/allRentOrder`)
  }

  updateRentStatus(_id:string,status:string):Observable<RentMaterial>{
    return this.http.patch<RentMaterial>(`${this.apiUrl}/rent/updateRentStatus`,{status,_id})
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  environment = environment.apiUrl;

  singUp(user: any) {
    return this.http.post(`${this.environment}/auth/singUp`, user);
  }

  login(userData: any) {
    return this.http.post(`${this.environment}/auth/login`, userData);
  }

  verifyOtp(emailAndOtp:{otp:string,email:string}){
    return this.http.post(`${this.environment}/auth/verifyOtp`,emailAndOtp)
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {  
    const value = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('LocalStorage parse error:', e);
      return null;
    }
  }
}

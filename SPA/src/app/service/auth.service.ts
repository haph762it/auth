import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginModel, IUserRegistrationModel, ResponseRegistration } from '../model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:5002/api/Auth';
  createUser(formData: IUserRegistrationModel) {
    return this.http.post(this.baseURL + '/signup', formData);
  }

  signin(formData: ILoginModel) {
    return this.http.post(this.baseURL + '/signin', formData);
  }

  signup(formData: IUserRegistrationModel) {
    return this.http.post<ResponseRegistration>(this.baseURL + '/signup', formData);
  }
}

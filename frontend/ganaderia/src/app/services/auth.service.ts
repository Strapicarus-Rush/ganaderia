import { Injectable } from '@angular/core';
// import { authUser } from '../interfaces/responses';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { User, authUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {// implements User {

  // id: number | undefined | null;
  // username: string | undefined | null;
  // password: string | undefined | null;
  // createdAt: Date | undefined | null;
  // updatedAt: Date | undefined | null;

  private user!: BehaviorSubject<User>;
  // public userData!: Observable<User>;
  private apiUrl = 'http://localhost:8080/user';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const noUser = {
      id: 0,
      username: 'Jonh Doe',
      password: 'Jonh Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userData') || JSON.stringify(noUser)));

    // this.userData = this.user.asObservable();
  }

  public getUserDataValue(): User {
    return this.user.value;
  }

  public login(email: string, password: string) {
    return this.http.post<authUser>(`${this.apiUrl}/login`, { email: email, password: password })
      .pipe(
        map((user) => {
          localStorage.setItem('userData', JSON.stringify(user));
          this.user.next(user.data);
          return user;
        }),
        catchError(this.handleError)
      );
  }

  public logout() {
    localStorage.removeItem('userData');
    this.user.next({
      id: 0,
      username: '',
      password: '',
      password_confirmation: '',
      createdAt: new Date(),
      updatedAt: new Date(),

    });
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => { 'Something bad happened; please try again later.' });
  }

  public getUserData(): Observable<User> {
    return this.user.asObservable();
  }

  

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }
}

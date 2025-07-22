import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:3000/api/';
  private _loggedIn = signal(false);
  readonly isLoggedIn = computed(() => this._loggedIn());
  redirectUrl: string | undefined;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'signin', data)
      .pipe(
        tap(_ => this._loggedIn.set(true)),
        catchError(this.handleError('login', []))
      );
  }

  logout(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'signout')
      .pipe(
        tap(_ => this._loggedIn.set(false)),
        catchError(this.handleError('logout', []))
      );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'signup', data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}

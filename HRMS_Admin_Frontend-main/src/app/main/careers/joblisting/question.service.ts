import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class QuestionListService implements Resolve<any> {
  public rows: any;
  public onUserListChanged: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onUserListChanged = new BehaviorSubject({});
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.gettAllQuestions()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */
   

  // gettAllQuestions(): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.get(`${environment.apiUrl}/api/questions`).subscribe((response: any) => {
  //       this.rows = response;
  //       this.onUserListChanged.next(this.rows);
  //       resolve(this.rows);
  //     }, reject);
  //   });
  // }

  gettAllQuestions(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/api/questions`).subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  // addQuestion(value:any): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     this._httpClient.post(`${environment.apiUrl}/api/questions`,value).subscribe((response: any) => {
  //       this.rows = response;
  //       this.onUserListChanged.next(this.rows);
  //       resolve(this.rows);
  //     }, reject);
  //   });
  // }

  addQuestion(value: any): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/questions`,value).pipe(
      tap(addedQuestion => {
        this.onUserListChanged.next(addedQuestion); // Notify the component of the new question addition
      })
    );
  }

  addCheckboxQuestion(value: any): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/checkboxQuestion`,value).pipe(
      tap(addedQuestion => {
        this.onUserListChanged.next(addedQuestion); // Notify the component of the new question addition
      })
    );
  }

  getAllQuestions(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/questions`)
  }

  getAllFactorQuestions(): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/api/factor`)
  }

  addFactorQuestion(value: any): Observable<any> {
    return this._httpClient.post(`${environment.apiUrl}/api/factor`,value).pipe(
      tap(addedFactorQuestion => {
        this.onUserListChanged.next(addedFactorQuestion); // Notify the component of the new question addition
      })
    );
  }

  // // Method to get the list of questions
  // getQuestions(): Observable<Question[]> {
  //   return this.http.get<Question[]>('/api/questions');
  // }

  // // Method to subscribe to question added events
  // onQuestionAdded(): Observable<Question> {
  //   return this.questionAddedSubject.asObservable();
  // }
}













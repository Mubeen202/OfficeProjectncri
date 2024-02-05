import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ProfileService implements Resolve<any> {
  rows: any;
  onPricingChanged: BehaviorSubject<any>;
  onCandidteChange: BehaviorSubject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.onPricingChanged = new BehaviorSubject({});
    this.onCandidteChange = new BehaviorSubject({});
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
      Promise.all([this.getCandidateById(),this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get rows
   */


    getCandidateById(): Promise<any[]> {
    let url = JSON.parse(localStorage.getItem('candidateId'))
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/candidate/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getCandidateByIdUsingParameter(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/candidate/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getCandidateEducationData(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/candidateEducation/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getCandidateExperienceData(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/candidateExperience/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }


  getCandidateCertificationData(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/candidateCertification/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  getAllOrganizationRecords(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${environment.apiUrl}/organization`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }




  deleteCandidateEducationRecord(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${environment.apiUrl}/candidateEducation/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  deleteCandidateExperienceRecord(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${environment.apiUrl}/candidateExperience/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }


  deleteCandidateCertificationRecord(url): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.delete(`${environment.apiUrl}/candidateCertification/${url}`).subscribe((response: any) => {
        this.rows = response;
        this.onCandidteChange.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/profile-data').subscribe((response: any) => {
        this.rows = response;
        this.onPricingChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  candidateEducation(payload): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/candidateEducation`, payload).subscribe((response: any) => {
        this.rows = response;
        this.onPricingChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  candidateExperience(payload): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/candidateExperience`, payload).subscribe((response: any) => {
        this.rows = response;
        this.onPricingChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  candidateCertification(payload): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${environment.apiUrl}/candidateCertification`, payload).subscribe((response: any) => {
        this.rows = response;
        this.onPricingChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }

  editcandidateEducation(id,payload): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/candidateEducation/${id}`, payload).subscribe((response: any) => {
        this.rows = response;
        this.onPricingChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  editcandidateExperience(id,payload): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/candidateExperience/${id}`, payload).subscribe((response: any) => {
        this.rows = response;
        this.onPricingChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
  editcandidateCertification(id,payload): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${environment.apiUrl}/candidateCertification/${id}`, payload).subscribe((response: any) => {
        this.rows = response;
        this.onPricingChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}

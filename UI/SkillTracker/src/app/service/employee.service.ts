import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ServiceResponse } from '../model/service-response';
import { AssociateDetails } from '../model/associate-details';

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  ROOT_URL: String = "http://localhost:8085/skilltrackerservice/associates";

  getAllEmployees(): Observable<AssociateDetails[]> {
    return this.http.get(this.ROOT_URL + "/getall").map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  saveEmployee(details: AssociateDetails, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('associateDetails', JSON.stringify(details));
    return this.http.post(this.ROOT_URL + "/save", formData).map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  getEmployeeById(id: number): Observable<AssociateDetails> {
    return this.http.get(this.ROOT_URL + "/getasociate/" + id).map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  deleteEmployee(details: AssociateDetails) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.ROOT_URL + "/delete", details, options).map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleErrorObservable(error: Response | any) {
    console.error("This is error: " + error.message || error);
    return Observable.throw(error.message || error);
  }
}

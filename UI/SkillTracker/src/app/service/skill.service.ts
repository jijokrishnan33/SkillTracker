import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Skill } from '../model/skill';
import { ServiceResponse } from '../model/service-response'

@Injectable()
export class SkillService {

  constructor(private http: Http) { }

  ROOT_URL: String = "http://localhost:8085/skilltrackerservice/skills";

  getAllSkills(): Observable<Skill[]> {
    return this.http.get(this.ROOT_URL + "/getall").map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  save(skill: Skill): Observable<ServiceResponse> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.ROOT_URL + "/save", skill, options).map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  delete(skill: Skill): Observable<ServiceResponse> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.ROOT_URL + "/delete", skill, options).map(this.extractData)
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

import { Injectable } from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ServiceResponse } from '../model/service-response';
import { AssociateDetails } from '../model/associate-details';
import { MockData} from './mock.data';

export class MockEmployeeService {
 
    mockdata=new MockData();
    mockAssociateDetails= this.mockdata.mockAssociateDetails;

    getAllEmployees(): Observable<AssociateDetails[]> {
        return Observable.of(this.mockAssociateDetails);
    }

    saveEmployee(details: AssociateDetails, file: File) {
        return  Observable.of(new ServiceResponse("Success"));
    }

    getEmployeeById(id: number): Observable<AssociateDetails> {
        return Observable.of(this.mockAssociateDetails[0]);
    }

    deleteEmployee(details: AssociateDetails) {
        return  Observable.of(new ServiceResponse("Success"));
    } 
    

    
}

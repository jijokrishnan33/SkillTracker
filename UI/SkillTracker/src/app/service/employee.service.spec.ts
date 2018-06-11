import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HttpModule, ResponseType } from '@angular/http';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { Skill } from '../model/skill';
import { AssociateDetails } from '../model/associate-details'
import { EmployeeService } from './employee.service';
import { ServiceResponse } from '../model/service-response';

describe('EmployeeService', () => {

  let subject: EmployeeService;
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, defaultOptions: RequestOptions) => {
            return new Http(mockBackend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });
  beforeEach(inject([EmployeeService, MockBackend], (service, mockBackend) => {
    subject = service;
    backend = mockBackend;
  }));

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Employee details List from get all employees service', (done) => {
    let employees: AssociateDetails[] = [{"associateId":16516,"name":"sdas","email":"jijokrishnan33@gmail.com","mobile":"4564645645","gender":"Male","pic":"","statusGreen":false,"statusBlue":true,"statusRed":false,"level1":false,"level2":true,"level3":false,"remark":"asda","spokenLevel":9,"communicactionLevel":10,"logicLevel":8,"aptitudeLevel":18,"confidenceLevel":10,"strength":"asda","weakness":"sdasd","skills":[{ "skillId": 238, "skillName": "HTML" ,"skillLevel":10}]}]
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/skilltrackerservice/associates/getall');
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let options = new ResponseOptions({
        body: employees,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.getAllEmployees().subscribe(response => {
      this.list = response;
      expect(response).toEqual(employees);
      done();
    });
  });

  it('should get Employee details List from get employee by id service', (done) => {
    let employee: AssociateDetails = {"associateId":16516,"name":"sdas","email":"jijokrishnan33@gmail.com","mobile":"4564645645","gender":"Male","pic":"","statusGreen":false,"statusBlue":true,"statusRed":false,"level1":false,"level2":true,"level3":false,"remark":"asda","spokenLevel":9,"communicactionLevel":10,"logicLevel":8,"aptitudeLevel":18,"confidenceLevel":10,"strength":"asda","weakness":"sdasd","skills":[{ "skillId": 238, "skillName": "HTML" ,"skillLevel":10}]}
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/skilltrackerservice/associates/getasociate/16516');
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let options = new ResponseOptions({
        body: employee,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.getEmployeeById(16516).subscribe(response => {
      this.list = response;
      expect(response).toEqual(employee);
      done();
    });
  });

  it('should Check input argument and response of Save Employee service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let employee: AssociateDetails = {"associateId":16516,"name":"sdas","email":"jijokrishnan33@gmail.com","mobile":"4564645645","gender":"Male","pic":"","statusGreen":false,"statusBlue":true,"statusRed":false,"level1":false,"level2":true,"level3":false,"remark":"asda","spokenLevel":9,"communicactionLevel":10,"logicLevel":8,"aptitudeLevel":18,"confidenceLevel":10,"strength":"asda","weakness":"sdasd","skills":[{ "skillId": 238, "skillName": "HTML" ,"skillLevel":10}]};
    let file : File= new File(["3555"], 'test-file.jpg', {lastModified : 1000000, type: 'image/jpeg'});
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/skilltrackerservice/associates/save');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.saveEmployee(employee,file).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });

  it('should Check input argument and response of Delete Employee service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let employee: AssociateDetails = {"associateId":16516,"name":"sdas","email":"jijokrishnan33@gmail.com","mobile":"4564645645","gender":"Male","pic":"","statusGreen":false,"statusBlue":true,"statusRed":false,"level1":false,"level2":true,"level3":false,"remark":"asda","spokenLevel":9,"communicactionLevel":10,"logicLevel":8,"aptitudeLevel":18,"confidenceLevel":10,"strength":"asda","weakness":"sdasd","skills":[{ "skillId": 238, "skillName": "HTML" ,"skillLevel":10}]};
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/skilltrackerservice/associates/delete');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.deleteEmployee(employee).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });

});

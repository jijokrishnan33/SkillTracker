import { TestBed, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { SkillService } from './skill.service';

import { HttpModule, ResponseType } from '@angular/http';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, RequestOptions } from '@angular/http';
import { Skill } from '../model/skill';
import { ServiceResponse } from '../model/service-response';

fdescribe('SkillService', () => {
  let subject: SkillService;
  let backend: MockBackend;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkillService,
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
  beforeEach(inject([SkillService, MockBackend], (service, mockBackend) => {
    subject = service;
    backend = mockBackend;
  }));

  it('should be created', inject([SkillService], (service: SkillService) => {
    expect(service).toBeTruthy();
  }));


  it('should get Skill List from get all skill service', (done) => {
    let skills: Skill[] = [{
      skillId: 1,
      skillName: "HTML",
    }];
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/skilltrackerservice/skills/getall');
      expect(connection.request.method).toEqual(RequestMethod.Get);
      let options = new ResponseOptions({
        body: skills,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.getAllSkills().subscribe(response => {
      this.list = response;
      expect(response).toEqual(skills);
      done();
    });
  });

  it('should Check input argument and response of Save Skill service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let skill: Skill = {
      skillId: 12,
      skillName: "HTML",
    };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/skilltrackerservice/skills/save');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        skillId: 12,
        skillName: "HTML",
      }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.save(skill).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });

  /**it('should Check the handling for error from service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let skill: Skill = {
      skillId: 12,
      skillName: "HTML",
    };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/skilltrackerservice/skills/save');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        skillId: 12,
        skillName: "HTML",
      }, null, 2));

      let body = JSON.stringify({ key: 'val' });
      let opts = { type: ResponseType.Error, status: 404, body: body };
      let responseOpts = new ResponseOptions(opts);
      connection.mockError(new MockError(responseOpts));
    });
    subject.save(skill).subscribe(
      response => {},
      err => {console.log(err.options)});
  });*/

  it('should Check input argument and response of Delete Skill service', (done) => {
    let serResponse: ServiceResponse = {
      message: "Success"
    };
    let skill: Skill = {
      skillId: 12,
      skillName: "HTML",
    };
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toEqual('http://localhost:8085/skilltrackerservice/skills/delete');
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.getBody()).toEqual(JSON.stringify({
        skillId: 12,
        skillName: "HTML",
      }, null, 2));
      let options = new ResponseOptions({
        body: serResponse,
        status: 200
      });
      connection.mockRespond(new Response(options));
    });
    subject.delete(skill).subscribe(response => {
      expect(response).toEqual(serResponse);
      done();
    });
  });
  class MockError extends Response implements Error {
    name: any
    message: any
  }

});

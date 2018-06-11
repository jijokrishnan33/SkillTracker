import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { SkillComponent } from './skill/skill.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeService } from './service/employee.service';
import { SkillService } from './service/skill.service';
import { SkillPipe } from './pipe/skill.pipe';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AssociateNamePipe } from './pipe/associate-name.pipe';
import { AssociateIdPipe } from './pipe/associate-id.pipe';
import { AssociateEmailPipe } from './pipe/associate-email.pipe';
import { AssociatePhonePipe } from './pipe/associate-phone.pipe';
import { AssociateSkillPipe } from './pipe/associate-skill.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SkillComponent,
    DashboardComponent,
    SkillPipe,
    AddEmployeeComponent,
    EditEmployeeComponent,
    AssociateNamePipe,
    AssociateIdPipe,
    AssociateEmailPipe,
    AssociatePhonePipe,
    AssociateSkillPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    EmployeeService,
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

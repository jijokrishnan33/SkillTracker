import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SkillComponent } from './skill/skill.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component'

const routes: Routes = [
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'add-skill', component: SkillComponent },
  { path: 'edit/:id', component: EditEmployeeComponent },
  { path: 'view/:id', component: EditEmployeeComponent },
  { path: '', component: DashboardComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

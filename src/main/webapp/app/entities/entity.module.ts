import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'employee',
        loadChildren: () => import('./employee/employee.module').then(m => m.TestDigLabEmployeeModule),
      },
      {
        path: 'department',
        loadChildren: () => import('./department/department.module').then(m => m.TestDigLabDepartmentModule),
      },
      {
        path: 'salary',
        loadChildren: () => import('./salary/salary.module').then(m => m.TestDigLabSalaryModule),
      },
      {
        path: 'title',
        loadChildren: () => import('./title/title.module').then(m => m.TestDigLabTitleModule),
      },
      {
        path: 'department-employee',
        loadChildren: () => import('./department-employee/department-employee.module').then(m => m.TestDigLabDepartmentEmployeeModule),
      },
      {
        path: 'department-manager',
        loadChildren: () => import('./department-manager/department-manager.module').then(m => m.TestDigLabDepartmentManagerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class TestDigLabEntityModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestDigLabSharedModule } from 'app/shared/shared.module';
import { DepartmentEmployeeComponent } from './department-employee.component';
import { DepartmentEmployeeDetailComponent } from './department-employee-detail.component';
import { DepartmentEmployeeUpdateComponent } from './department-employee-update.component';
import { DepartmentEmployeeDeleteDialogComponent } from './department-employee-delete-dialog.component';
import { departmentEmployeeRoute } from './department-employee.route';

@NgModule({
  imports: [TestDigLabSharedModule, RouterModule.forChild(departmentEmployeeRoute)],
  declarations: [
    DepartmentEmployeeComponent,
    DepartmentEmployeeDetailComponent,
    DepartmentEmployeeUpdateComponent,
    DepartmentEmployeeDeleteDialogComponent,
  ],
  entryComponents: [DepartmentEmployeeDeleteDialogComponent],
})
export class TestDigLabDepartmentEmployeeModule {}

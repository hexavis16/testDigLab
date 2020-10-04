import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestDigLabSharedModule } from 'app/shared/shared.module';
import { DepartmentManagerComponent } from './department-manager.component';
import { DepartmentManagerDetailComponent } from './department-manager-detail.component';
import { DepartmentManagerUpdateComponent } from './department-manager-update.component';
import { DepartmentManagerDeleteDialogComponent } from './department-manager-delete-dialog.component';
import { departmentManagerRoute } from './department-manager.route';

@NgModule({
  imports: [TestDigLabSharedModule, RouterModule.forChild(departmentManagerRoute)],
  declarations: [
    DepartmentManagerComponent,
    DepartmentManagerDetailComponent,
    DepartmentManagerUpdateComponent,
    DepartmentManagerDeleteDialogComponent,
  ],
  entryComponents: [DepartmentManagerDeleteDialogComponent],
})
export class TestDigLabDepartmentManagerModule {}

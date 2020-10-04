import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestDigLabSharedModule } from 'app/shared/shared.module';
import { SalaryComponent } from './salary.component';
import { SalaryDetailComponent } from './salary-detail.component';
import { SalaryUpdateComponent } from './salary-update.component';
import { SalaryDeleteDialogComponent } from './salary-delete-dialog.component';
import { salaryRoute } from './salary.route';

@NgModule({
  imports: [TestDigLabSharedModule, RouterModule.forChild(salaryRoute)],
  declarations: [SalaryComponent, SalaryDetailComponent, SalaryUpdateComponent, SalaryDeleteDialogComponent],
  entryComponents: [SalaryDeleteDialogComponent],
})
export class TestDigLabSalaryModule {}

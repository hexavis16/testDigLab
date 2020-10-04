import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestDigLabSharedModule } from 'app/shared/shared.module';
import { TitleComponent } from './title.component';
import { TitleDetailComponent } from './title-detail.component';
import { TitleUpdateComponent } from './title-update.component';
import { TitleDeleteDialogComponent } from './title-delete-dialog.component';
import { titleRoute } from './title.route';

@NgModule({
  imports: [TestDigLabSharedModule, RouterModule.forChild(titleRoute)],
  declarations: [TitleComponent, TitleDetailComponent, TitleUpdateComponent, TitleDeleteDialogComponent],
  entryComponents: [TitleDeleteDialogComponent],
})
export class TestDigLabTitleModule {}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITitle } from 'app/shared/model/title.model';
import { TitleService } from './title.service';

@Component({
  templateUrl: './title-delete-dialog.component.html',
})
export class TitleDeleteDialogComponent {
  title?: ITitle;

  constructor(protected titleService: TitleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.titleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('titleListModification');
      this.activeModal.close();
    });
  }
}

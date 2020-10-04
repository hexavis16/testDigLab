import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentManager } from 'app/shared/model/department-manager.model';
import { DepartmentManagerService } from './department-manager.service';

@Component({
  templateUrl: './department-manager-delete-dialog.component.html',
})
export class DepartmentManagerDeleteDialogComponent {
  departmentManager?: IDepartmentManager;

  constructor(
    protected departmentManagerService: DepartmentManagerService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departmentManagerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('departmentManagerListModification');
      this.activeModal.close();
    });
  }
}

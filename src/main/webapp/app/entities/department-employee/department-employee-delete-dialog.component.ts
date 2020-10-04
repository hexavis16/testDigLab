import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentEmployee } from 'app/shared/model/department-employee.model';
import { DepartmentEmployeeService } from './department-employee.service';

@Component({
  templateUrl: './department-employee-delete-dialog.component.html',
})
export class DepartmentEmployeeDeleteDialogComponent {
  departmentEmployee?: IDepartmentEmployee;

  constructor(
    protected departmentEmployeeService: DepartmentEmployeeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departmentEmployeeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('departmentEmployeeListModification');
      this.activeModal.close();
    });
  }
}

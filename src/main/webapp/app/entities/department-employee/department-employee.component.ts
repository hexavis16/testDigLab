import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentEmployee } from 'app/shared/model/department-employee.model';
import { DepartmentEmployeeService } from './department-employee.service';
import { DepartmentEmployeeDeleteDialogComponent } from './department-employee-delete-dialog.component';

@Component({
  selector: 'jhi-department-employee',
  templateUrl: './department-employee.component.html',
})
export class DepartmentEmployeeComponent implements OnInit, OnDestroy {
  departmentEmployees?: IDepartmentEmployee[];
  eventSubscriber?: Subscription;

  constructor(
    protected departmentEmployeeService: DepartmentEmployeeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.departmentEmployeeService
      .query()
      .subscribe((res: HttpResponse<IDepartmentEmployee[]>) => (this.departmentEmployees = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartmentEmployees();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartmentEmployee): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartmentEmployees(): void {
    this.eventSubscriber = this.eventManager.subscribe('departmentEmployeeListModification', () => this.loadAll());
  }

  delete(departmentEmployee: IDepartmentEmployee): void {
    const modalRef = this.modalService.open(DepartmentEmployeeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.departmentEmployee = departmentEmployee;
  }
}

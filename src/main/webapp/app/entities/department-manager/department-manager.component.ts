import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDepartmentManager } from 'app/shared/model/department-manager.model';
import { DepartmentManagerService } from './department-manager.service';
import { DepartmentManagerDeleteDialogComponent } from './department-manager-delete-dialog.component';

@Component({
  selector: 'jhi-department-manager',
  templateUrl: './department-manager.component.html',
})
export class DepartmentManagerComponent implements OnInit, OnDestroy {
  departmentManagers?: IDepartmentManager[];
  eventSubscriber?: Subscription;

  constructor(
    protected departmentManagerService: DepartmentManagerService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.departmentManagerService
      .query()
      .subscribe((res: HttpResponse<IDepartmentManager[]>) => (this.departmentManagers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDepartmentManagers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDepartmentManager): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDepartmentManagers(): void {
    this.eventSubscriber = this.eventManager.subscribe('departmentManagerListModification', () => this.loadAll());
  }

  delete(departmentManager: IDepartmentManager): void {
    const modalRef = this.modalService.open(DepartmentManagerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.departmentManager = departmentManager;
  }
}

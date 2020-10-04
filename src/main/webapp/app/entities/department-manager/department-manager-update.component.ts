import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDepartmentManager, DepartmentManager } from 'app/shared/model/department-manager.model';
import { DepartmentManagerService } from './department-manager.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';

type SelectableEntity = IEmployee | IDepartment;

@Component({
  selector: 'jhi-department-manager-update',
  templateUrl: './department-manager-update.component.html',
})
export class DepartmentManagerUpdateComponent implements OnInit {
  isSaving = false;
  employees: IEmployee[] = [];
  departments: IDepartment[] = [];

  editForm = this.fb.group({
    id: [],
    fromDate: [null, [Validators.required]],
    toDate: [],
    employee: [],
    department: [],
  });

  constructor(
    protected departmentManagerService: DepartmentManagerService,
    protected employeeService: EmployeeService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ departmentManager }) => {
      if (!departmentManager.id) {
        const today = moment().startOf('day');
        departmentManager.fromDate = today;
        departmentManager.toDate = today;
      }

      this.updateForm(departmentManager);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body || []));

      this.departmentService.query().subscribe((res: HttpResponse<IDepartment[]>) => (this.departments = res.body || []));
    });
  }

  updateForm(departmentManager: IDepartmentManager): void {
    this.editForm.patchValue({
      id: departmentManager.id,
      fromDate: departmentManager.fromDate ? departmentManager.fromDate.format(DATE_TIME_FORMAT) : null,
      toDate: departmentManager.toDate ? departmentManager.toDate.format(DATE_TIME_FORMAT) : null,
      employee: departmentManager.employee,
      department: departmentManager.department,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const departmentManager = this.createFromForm();
    if (departmentManager.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentManagerService.update(departmentManager));
    } else {
      this.subscribeToSaveResponse(this.departmentManagerService.create(departmentManager));
    }
  }

  private createFromForm(): IDepartmentManager {
    return {
      ...new DepartmentManager(),
      id: this.editForm.get(['id'])!.value,
      fromDate: this.editForm.get(['fromDate'])!.value ? moment(this.editForm.get(['fromDate'])!.value, DATE_TIME_FORMAT) : undefined,
      toDate: this.editForm.get(['toDate'])!.value ? moment(this.editForm.get(['toDate'])!.value, DATE_TIME_FORMAT) : undefined,
      employee: this.editForm.get(['employee'])!.value,
      department: this.editForm.get(['department'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentManager>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IDepartmentEmployee, DepartmentEmployee } from 'app/shared/model/department-employee.model';
import { DepartmentEmployeeService } from './department-employee.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department/department.service';

type SelectableEntity = IEmployee | IDepartment;

@Component({
  selector: 'jhi-department-employee-update',
  templateUrl: './department-employee-update.component.html',
})
export class DepartmentEmployeeUpdateComponent implements OnInit {
  isSaving = false;
  employees: IEmployee[] = [];
  departments: IDepartment[] = [];

  editForm = this.fb.group({
    id: [],
    fromDate: [null, [Validators.required]],
    toDate: [],
    employee: [null, Validators.required],
    department: [null, Validators.required],
  });

  constructor(
    protected departmentEmployeeService: DepartmentEmployeeService,
    protected employeeService: EmployeeService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ departmentEmployee }) => {
      if (!departmentEmployee.id) {
        const today = moment().startOf('day');
        departmentEmployee.fromDate = today;
        departmentEmployee.toDate = today;
      }

      this.updateForm(departmentEmployee);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body || []));

      this.departmentService.query().subscribe((res: HttpResponse<IDepartment[]>) => (this.departments = res.body || []));
    });
  }

  updateForm(departmentEmployee: IDepartmentEmployee): void {
    this.editForm.patchValue({
      id: departmentEmployee.id,
      fromDate: departmentEmployee.fromDate ? departmentEmployee.fromDate.format(DATE_TIME_FORMAT) : null,
      toDate: departmentEmployee.toDate ? departmentEmployee.toDate.format(DATE_TIME_FORMAT) : null,
      employee: departmentEmployee.employee,
      department: departmentEmployee.department,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const departmentEmployee = this.createFromForm();
    if (departmentEmployee.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentEmployeeService.update(departmentEmployee));
    } else {
      this.subscribeToSaveResponse(this.departmentEmployeeService.create(departmentEmployee));
    }
  }

  private createFromForm(): IDepartmentEmployee {
    return {
      ...new DepartmentEmployee(),
      id: this.editForm.get(['id'])!.value,
      fromDate: this.editForm.get(['fromDate'])!.value ? moment(this.editForm.get(['fromDate'])!.value, DATE_TIME_FORMAT) : undefined,
      toDate: this.editForm.get(['toDate'])!.value ? moment(this.editForm.get(['toDate'])!.value, DATE_TIME_FORMAT) : undefined,
      employee: this.editForm.get(['employee'])!.value,
      department: this.editForm.get(['department'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentEmployee>>): void {
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

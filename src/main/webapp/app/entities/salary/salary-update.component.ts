import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISalary, Salary } from 'app/shared/model/salary.model';
import { SalaryService } from './salary.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-salary-update',
  templateUrl: './salary-update.component.html',
})
export class SalaryUpdateComponent implements OnInit {
  isSaving = false;
  employees: IEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    amount: [null, [Validators.required]],
    fromDate: [null, [Validators.required]],
    toDate: [],
    employee: [],
  });

  constructor(
    protected salaryService: SalaryService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ salary }) => {
      if (!salary.id) {
        const today = moment().startOf('day');
        salary.fromDate = today;
        salary.toDate = today;
      }

      this.updateForm(salary);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body || []));
    });
  }

  updateForm(salary: ISalary): void {
    this.editForm.patchValue({
      id: salary.id,
      amount: salary.amount,
      fromDate: salary.fromDate ? salary.fromDate.format(DATE_TIME_FORMAT) : null,
      toDate: salary.toDate ? salary.toDate.format(DATE_TIME_FORMAT) : null,
      employee: salary.employee,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const salary = this.createFromForm();
    if (salary.id !== undefined) {
      this.subscribeToSaveResponse(this.salaryService.update(salary));
    } else {
      this.subscribeToSaveResponse(this.salaryService.create(salary));
    }
  }

  private createFromForm(): ISalary {
    return {
      ...new Salary(),
      id: this.editForm.get(['id'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      fromDate: this.editForm.get(['fromDate'])!.value ? moment(this.editForm.get(['fromDate'])!.value, DATE_TIME_FORMAT) : undefined,
      toDate: this.editForm.get(['toDate'])!.value ? moment(this.editForm.get(['toDate'])!.value, DATE_TIME_FORMAT) : undefined,
      employee: this.editForm.get(['employee'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISalary>>): void {
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

  trackById(index: number, item: IEmployee): any {
    return item.id;
  }
}

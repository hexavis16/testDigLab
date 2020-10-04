import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEmployee, Employee } from 'app/shared/model/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html',
})
export class EmployeeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    names: [null, [Validators.required, Validators.maxLength(50)]],
    lastNames: [null, [Validators.required, Validators.maxLength(50)]],
    gender: [null, [Validators.required, Validators.maxLength(1)]],
    birthDate: [null, [Validators.required]],
    hireDate: [null, [Validators.required]],
  });

  constructor(protected employeeService: EmployeeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employee }) => {
      if (!employee.id) {
        const today = moment().startOf('day');
        employee.birthDate = today;
        employee.hireDate = today;
      }

      this.updateForm(employee);
    });
  }

  updateForm(employee: IEmployee): void {
    this.editForm.patchValue({
      id: employee.id,
      names: employee.names,
      lastNames: employee.lastNames,
      gender: employee.gender,
      birthDate: employee.birthDate ? employee.birthDate.format(DATE_TIME_FORMAT) : null,
      hireDate: employee.hireDate ? employee.hireDate.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployee {
    return {
      ...new Employee(),
      id: this.editForm.get(['id'])!.value,
      names: this.editForm.get(['names'])!.value,
      lastNames: this.editForm.get(['lastNames'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value ? moment(this.editForm.get(['birthDate'])!.value, DATE_TIME_FORMAT) : undefined,
      hireDate: this.editForm.get(['hireDate'])!.value ? moment(this.editForm.get(['hireDate'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>): void {
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
}

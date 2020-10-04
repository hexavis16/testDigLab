import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ITitle, Title } from 'app/shared/model/title.model';
import { TitleService } from './title.service';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee/employee.service';

@Component({
  selector: 'jhi-title-update',
  templateUrl: './title-update.component.html',
})
export class TitleUpdateComponent implements OnInit {
  isSaving = false;
  employees: IEmployee[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required, Validators.maxLength(50)]],
    fromDate: [null, [Validators.required]],
    toDate: [],
    employee: [],
  });

  constructor(
    protected titleService: TitleService,
    protected employeeService: EmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ title }) => {
      if (!title.id) {
        const today = moment().startOf('day');
        title.fromDate = today;
        title.toDate = today;
      }

      this.updateForm(title);

      this.employeeService.query().subscribe((res: HttpResponse<IEmployee[]>) => (this.employees = res.body || []));
    });
  }

  updateForm(title: ITitle): void {
    this.editForm.patchValue({
      id: title.id,
      title: title.title,
      fromDate: title.fromDate ? title.fromDate.format(DATE_TIME_FORMAT) : null,
      toDate: title.toDate ? title.toDate.format(DATE_TIME_FORMAT) : null,
      employee: title.employee,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const title = this.createFromForm();
    if (title.id !== undefined) {
      this.subscribeToSaveResponse(this.titleService.update(title));
    } else {
      this.subscribeToSaveResponse(this.titleService.create(title));
    }
  }

  private createFromForm(): ITitle {
    return {
      ...new Title(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      fromDate: this.editForm.get(['fromDate'])!.value ? moment(this.editForm.get(['fromDate'])!.value, DATE_TIME_FORMAT) : undefined,
      toDate: this.editForm.get(['toDate'])!.value ? moment(this.editForm.get(['toDate'])!.value, DATE_TIME_FORMAT) : undefined,
      employee: this.editForm.get(['employee'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitle>>): void {
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

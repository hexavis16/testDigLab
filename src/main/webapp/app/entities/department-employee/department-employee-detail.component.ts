import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentEmployee } from 'app/shared/model/department-employee.model';

@Component({
  selector: 'jhi-department-employee-detail',
  templateUrl: './department-employee-detail.component.html',
})
export class DepartmentEmployeeDetailComponent implements OnInit {
  departmentEmployee: IDepartmentEmployee | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ departmentEmployee }) => (this.departmentEmployee = departmentEmployee));
  }

  previousState(): void {
    window.history.back();
  }
}

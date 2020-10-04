import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentManager } from 'app/shared/model/department-manager.model';

@Component({
  selector: 'jhi-department-manager-detail',
  templateUrl: './department-manager-detail.component.html',
})
export class DepartmentManagerDetailComponent implements OnInit {
  departmentManager: IDepartmentManager | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ departmentManager }) => (this.departmentManager = departmentManager));
  }

  previousState(): void {
    window.history.back();
  }
}

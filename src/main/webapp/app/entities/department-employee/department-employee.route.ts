import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepartmentEmployee, DepartmentEmployee } from 'app/shared/model/department-employee.model';
import { DepartmentEmployeeService } from './department-employee.service';
import { DepartmentEmployeeComponent } from './department-employee.component';
import { DepartmentEmployeeDetailComponent } from './department-employee-detail.component';
import { DepartmentEmployeeUpdateComponent } from './department-employee-update.component';

@Injectable({ providedIn: 'root' })
export class DepartmentEmployeeResolve implements Resolve<IDepartmentEmployee> {
  constructor(private service: DepartmentEmployeeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentEmployee> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((departmentEmployee: HttpResponse<DepartmentEmployee>) => {
          if (departmentEmployee.body) {
            return of(departmentEmployee.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DepartmentEmployee());
  }
}

export const departmentEmployeeRoute: Routes = [
  {
    path: '',
    component: DepartmentEmployeeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.departmentEmployee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DepartmentEmployeeDetailComponent,
    resolve: {
      departmentEmployee: DepartmentEmployeeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.departmentEmployee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DepartmentEmployeeUpdateComponent,
    resolve: {
      departmentEmployee: DepartmentEmployeeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.departmentEmployee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DepartmentEmployeeUpdateComponent,
    resolve: {
      departmentEmployee: DepartmentEmployeeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.departmentEmployee.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

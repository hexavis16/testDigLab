import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDepartmentManager, DepartmentManager } from 'app/shared/model/department-manager.model';
import { DepartmentManagerService } from './department-manager.service';
import { DepartmentManagerComponent } from './department-manager.component';
import { DepartmentManagerDetailComponent } from './department-manager-detail.component';
import { DepartmentManagerUpdateComponent } from './department-manager-update.component';

@Injectable({ providedIn: 'root' })
export class DepartmentManagerResolve implements Resolve<IDepartmentManager> {
  constructor(private service: DepartmentManagerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentManager> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((departmentManager: HttpResponse<DepartmentManager>) => {
          if (departmentManager.body) {
            return of(departmentManager.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DepartmentManager());
  }
}

export const departmentManagerRoute: Routes = [
  {
    path: '',
    component: DepartmentManagerComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.departmentManager.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DepartmentManagerDetailComponent,
    resolve: {
      departmentManager: DepartmentManagerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.departmentManager.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DepartmentManagerUpdateComponent,
    resolve: {
      departmentManager: DepartmentManagerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.departmentManager.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DepartmentManagerUpdateComponent,
    resolve: {
      departmentManager: DepartmentManagerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.departmentManager.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

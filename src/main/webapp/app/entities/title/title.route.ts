import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITitle, Title } from 'app/shared/model/title.model';
import { TitleService } from './title.service';
import { TitleComponent } from './title.component';
import { TitleDetailComponent } from './title-detail.component';
import { TitleUpdateComponent } from './title-update.component';

@Injectable({ providedIn: 'root' })
export class TitleResolve implements Resolve<ITitle> {
  constructor(private service: TitleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((title: HttpResponse<Title>) => {
          if (title.body) {
            return of(title.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Title());
  }
}

export const titleRoute: Routes = [
  {
    path: '',
    component: TitleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.title.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TitleDetailComponent,
    resolve: {
      title: TitleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.title.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TitleUpdateComponent,
    resolve: {
      title: TitleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.title.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TitleUpdateComponent,
    resolve: {
      title: TitleResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testDigLabApp.title.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

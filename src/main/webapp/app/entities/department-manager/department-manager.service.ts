import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepartmentManager } from 'app/shared/model/department-manager.model';

type EntityResponseType = HttpResponse<IDepartmentManager>;
type EntityArrayResponseType = HttpResponse<IDepartmentManager[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentManagerService {
  public resourceUrl = SERVER_API_URL + 'api/department-managers';

  constructor(protected http: HttpClient) {}

  create(departmentManager: IDepartmentManager): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(departmentManager);
    return this.http
      .post<IDepartmentManager>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(departmentManager: IDepartmentManager): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(departmentManager);
    return this.http
      .put<IDepartmentManager>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDepartmentManager>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDepartmentManager[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(departmentManager: IDepartmentManager): IDepartmentManager {
    const copy: IDepartmentManager = Object.assign({}, departmentManager, {
      fromDate: departmentManager.fromDate && departmentManager.fromDate.isValid() ? departmentManager.fromDate.toJSON() : undefined,
      toDate: departmentManager.toDate && departmentManager.toDate.isValid() ? departmentManager.toDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fromDate = res.body.fromDate ? moment(res.body.fromDate) : undefined;
      res.body.toDate = res.body.toDate ? moment(res.body.toDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((departmentManager: IDepartmentManager) => {
        departmentManager.fromDate = departmentManager.fromDate ? moment(departmentManager.fromDate) : undefined;
        departmentManager.toDate = departmentManager.toDate ? moment(departmentManager.toDate) : undefined;
      });
    }
    return res;
  }
}

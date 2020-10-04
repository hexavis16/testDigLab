import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepartmentEmployee } from 'app/shared/model/department-employee.model';

type EntityResponseType = HttpResponse<IDepartmentEmployee>;
type EntityArrayResponseType = HttpResponse<IDepartmentEmployee[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentEmployeeService {
  public resourceUrl = SERVER_API_URL + 'api/department-employees';

  constructor(protected http: HttpClient) {}

  create(departmentEmployee: IDepartmentEmployee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(departmentEmployee);
    return this.http
      .post<IDepartmentEmployee>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(departmentEmployee: IDepartmentEmployee): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(departmentEmployee);
    return this.http
      .put<IDepartmentEmployee>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDepartmentEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDepartmentEmployee[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(departmentEmployee: IDepartmentEmployee): IDepartmentEmployee {
    const copy: IDepartmentEmployee = Object.assign({}, departmentEmployee, {
      fromDate: departmentEmployee.fromDate && departmentEmployee.fromDate.isValid() ? departmentEmployee.fromDate.toJSON() : undefined,
      toDate: departmentEmployee.toDate && departmentEmployee.toDate.isValid() ? departmentEmployee.toDate.toJSON() : undefined,
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
      res.body.forEach((departmentEmployee: IDepartmentEmployee) => {
        departmentEmployee.fromDate = departmentEmployee.fromDate ? moment(departmentEmployee.fromDate) : undefined;
        departmentEmployee.toDate = departmentEmployee.toDate ? moment(departmentEmployee.toDate) : undefined;
      });
    }
    return res;
  }
}

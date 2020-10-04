import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITitle } from 'app/shared/model/title.model';

type EntityResponseType = HttpResponse<ITitle>;
type EntityArrayResponseType = HttpResponse<ITitle[]>;

@Injectable({ providedIn: 'root' })
export class TitleService {
  public resourceUrl = SERVER_API_URL + 'api/titles';

  constructor(protected http: HttpClient) {}

  create(title: ITitle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(title);
    return this.http
      .post<ITitle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(title: ITitle): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(title);
    return this.http
      .put<ITitle>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITitle>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITitle[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(title: ITitle): ITitle {
    const copy: ITitle = Object.assign({}, title, {
      fromDate: title.fromDate && title.fromDate.isValid() ? title.fromDate.toJSON() : undefined,
      toDate: title.toDate && title.toDate.isValid() ? title.toDate.toJSON() : undefined,
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
      res.body.forEach((title: ITitle) => {
        title.fromDate = title.fromDate ? moment(title.fromDate) : undefined;
        title.toDate = title.toDate ? moment(title.toDate) : undefined;
      });
    }
    return res;
  }
}

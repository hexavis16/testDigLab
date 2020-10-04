import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';

export interface ITitle {
  id?: number;
  title?: string;
  fromDate?: Moment;
  toDate?: Moment;
  employee?: IEmployee;
}

export class Title implements ITitle {
  constructor(public id?: number, public title?: string, public fromDate?: Moment, public toDate?: Moment, public employee?: IEmployee) {}
}

import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';

export interface ISalary {
  id?: number;
  amount?: number;
  fromDate?: Moment;
  toDate?: Moment;
  employee?: IEmployee;
}

export class Salary implements ISalary {
  constructor(public id?: number, public amount?: number, public fromDate?: Moment, public toDate?: Moment, public employee?: IEmployee) {}
}

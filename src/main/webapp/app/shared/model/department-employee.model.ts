import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IDepartmentEmployee {
  id?: number;
  fromDate?: Moment;
  toDate?: Moment;
  employee?: IEmployee;
  department?: IDepartment;
}

export class DepartmentEmployee implements IDepartmentEmployee {
  constructor(
    public id?: number,
    public fromDate?: Moment,
    public toDate?: Moment,
    public employee?: IEmployee,
    public department?: IDepartment
  ) {}
}

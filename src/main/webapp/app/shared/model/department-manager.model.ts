import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IDepartmentManager {
  id?: number;
  fromDate?: Moment;
  toDate?: Moment;
  employee?: IEmployee;
  department?: IDepartment;
}

export class DepartmentManager implements IDepartmentManager {
  constructor(
    public id?: number,
    public fromDate?: Moment,
    public toDate?: Moment,
    public employee?: IEmployee,
    public department?: IDepartment
  ) {}
}

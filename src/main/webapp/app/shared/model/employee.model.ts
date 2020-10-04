import { Moment } from 'moment';
import { ISalary } from 'app/shared/model/salary.model';
import { ITitle } from 'app/shared/model/title.model';
import { IDepartmentEmployee } from 'app/shared/model/department-employee.model';
import { IDepartmentManager } from 'app/shared/model/department-manager.model';

export interface IEmployee {
  id?: number;
  names?: string;
  lastNames?: string;
  gender?: string;
  birthDate?: Moment;
  hireDate?: Moment;
  salaries?: ISalary[];
  titles?: ITitle[];
  departmentEmployees?: IDepartmentEmployee[];
  departmentManaders?: IDepartmentManager[];
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public names?: string,
    public lastNames?: string,
    public gender?: string,
    public birthDate?: Moment,
    public hireDate?: Moment,
    public salaries?: ISalary[],
    public titles?: ITitle[],
    public departmentEmployees?: IDepartmentEmployee[],
    public departmentManaders?: IDepartmentManager[]
  ) {}
}

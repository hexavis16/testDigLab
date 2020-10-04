import { IDepartmentEmployee } from 'app/shared/model/department-employee.model';
import { IDepartmentManager } from 'app/shared/model/department-manager.model';

export interface IDepartment {
  id?: number;
  name?: string;
  departmentEmployees?: IDepartmentEmployee[];
  departmentManaders?: IDepartmentManager[];
}

export class Department implements IDepartment {
  constructor(
    public id?: number,
    public name?: string,
    public departmentEmployees?: IDepartmentEmployee[],
    public departmentManaders?: IDepartmentManager[]
  ) {}
}

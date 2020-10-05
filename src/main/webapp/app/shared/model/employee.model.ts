import { Moment } from 'moment';

export interface IEmployee {
  id?: number;
  names?: string;
  lastNames?: string;
  gender?: string;
  birthDate?: Moment;
  hireDate?: Moment;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public names?: string,
    public lastNames?: string,
    public gender?: string,
    public birthDate?: Moment,
    public hireDate?: Moment
  ) {}
}

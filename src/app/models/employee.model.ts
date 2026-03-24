export type DepartementType = 'IT' | 'Marketing' | 'HR';
export type LevelType = 'J' | 'M' | 'S';

export interface IEmployee {
  id: string;
  name: string;
  departement: DepartementType;
  level: LevelType;
}

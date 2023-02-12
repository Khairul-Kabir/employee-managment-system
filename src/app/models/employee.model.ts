export interface Employee {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    gander: string;
    email: string;
    password: string;
    skills: EmployeeSkill[];
  }

  export interface EmployeeSkill{
    skillName: string;
    yearOfExperience: number;
    skillLevel: string;
  }
  
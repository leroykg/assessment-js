
export interface Skill {
  skill: string;
  yearsExperience: number;
  seniorityRating: string;
}

export interface Employee {
  id: string;
  uniqueId: string;
  firstName: string;
  lastName: string;
  telephone: string;
  emailAddress: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  country: string;
  skills: Skill[];
}
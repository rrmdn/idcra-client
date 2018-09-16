

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: user
// ====================================================

export type user_user_roles = {
  __typename: "Role",
  id: string,
  name: ?string,
};

export type user_user = {
  __typename: "User",
  id: string,
  email: ?string,
  password: ?string,
  ipAddress: ?string,
  createdAt: ?any,
  roles: ?Array<?user_user_roles>,
};

export type user = {
  user: ?user_user
};

export type userVariables = {
  email: string
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export type createUser_createUser_roles = {
  __typename: "Role",
  id: string,
  name: ?string,
};

export type createUser_createUser = {
  __typename: "User",
  id: string,
  email: ?string,
  password: ?string,
  ipAddress: ?string,
  createdAt: ?any,
  roles: ?Array<?createUser_createUser_roles>,
};

export type createUser = {
  createUser: ?createUser_createUser
};

export type createUserVariables = {
  email: string,
  password: string,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createSchool
// ====================================================

export type createSchool_createSchool_students = {
  __typename: "Student",
  id: string,
  name: ?string,
  dateOfBirth: ?any,
  schoolId: string,
  createdAt: ?any,
};

export type createSchool_createSchool = {
  __typename: "School",
  id: string,
  name: ?string,
  students: ?Array<?createSchool_createSchool_students>,
  createdAt: ?any,
};

export type createSchool = {
  createSchool: ?createSchool_createSchool
};

export type createSchoolVariables = {
  name: string
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: schools
// ====================================================

export type schools_schools_edges_node_students = {
  __typename: "Student",
  id: string,
  name: ?string,
  dateOfBirth: ?any,
  schoolId: string,
  createdAt: ?any,
};

export type schools_schools_edges_node = {
  __typename: "School",
  id: string,
  name: ?string,
  students: ?Array<?schools_schools_edges_node_students>,
  createdAt: ?any,
};

export type schools_schools_edges = {
  __typename: "SchoolsEdge",
  cursor: string,
  node: ?schools_schools_edges_node,
};

export type schools_schools_pageInfo = {
  __typename: "PageInfo",
  startCursor: ?string,
  endCursor: ?string,
  hasNextPage: boolean,
};

export type schools_schools = {
  __typename: "SchoolsConnection",
  totalCount: number,
  edges: ?Array<?schools_schools_edges>,
  pageInfo: schools_schools_pageInfo,
};

export type schools = {
  schools: schools_schools
};

export type schoolsVariables = {
  first: number,
  after?: ?string,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createStudent
// ====================================================

export type createStudent_createStudent = {
  __typename: "Student",
  id: string,
  name: ?string,
  dateOfBirth: ?any,
  schoolId: string,
  createdAt: ?any,
};

export type createStudent = {
  createStudent: ?createStudent_createStudent
};

export type createStudentVariables = {
  name: string,
  schoolID: string,
  dateOfBirth: string,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: students
// ====================================================

export type students_students_edges_node = {
  __typename: "Student",
  id: string,
  name: ?string,
  dateOfBirth: ?any,
  schoolId: string,
  createdAt: ?any,
};

export type students_students_edges = {
  __typename: "StudentsEdge",
  cursor: string,
  node: ?students_students_edges_node,
};

export type students_students_pageInfo = {
  __typename: "PageInfo",
  startCursor: ?string,
  endCursor: ?string,
  hasNextPage: boolean,
};

export type students_students = {
  __typename: "StudentsConnection",
  totalCount: number,
  edges: ?Array<?students_students_edges>,
  pageInfo: students_students_pageInfo,
};

export type students = {
  students: students_students
};

export type studentsVariables = {
  first: number,
  after?: ?string,
  schoolID?: ?string,
  keyword?: ?string,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createSurvey
// ====================================================

export type createSurvey_createSurvey_cases = {
  __typename: "Case",
  id: string,
  surveyId: ?string,
  toothNumber: ?number,
  diagnosisAndActionId: ?string,
  createdAt: ?any,
};

export type createSurvey_createSurvey = {
  __typename: "Survey",
  id: string,
  studentId: ?string,
  surveyorId: ?string,
  date: ?any,
  s1q1: ?string,
  s1q2: ?string,
  s1q3: ?string,
  s1q4: ?string,
  s1q5: ?string,
  s1q6: ?string,
  s1q7: ?string,
  s2q1: ?string,
  s2q2: ?string,
  s2q3: ?string,
  s2q4: ?string,
  s2q5: ?string,
  s2q6: ?string,
  s2q7: ?string,
  s2q8: ?string,
  s2q9: ?string,
  lowerD: ?number,
  lowerE: ?number,
  lowerF: ?number,
  upperD: ?number,
  upperM: ?number,
  upperF: ?number,
  subjectiveScore: ?number,
  createdAt: ?any,
  cases: ?Array<?createSurvey_createSurvey_cases>,
};

export type createSurvey = {
  createSurvey: createSurvey_createSurvey
};

export type createSurveyVariables = {
  survey: SurveyInput
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: diagnosisAndActions
// ====================================================

export type diagnosisAndActions_diagnosisAndActions_edges_node = {
  __typename: "DiagnosisAndAction",
  id: string,
  diagnosis: ?string,
  action: ?string,
  createdAt: ?any,
};

export type diagnosisAndActions_diagnosisAndActions_edges = {
  __typename: "DiagnosisAndActionsEdge",
  cursor: string,
  node: ?diagnosisAndActions_diagnosisAndActions_edges_node,
};

export type diagnosisAndActions_diagnosisAndActions_pageInfo = {
  __typename: "PageInfo",
  startCursor: ?string,
  endCursor: ?string,
  hasNextPage: boolean,
};

export type diagnosisAndActions_diagnosisAndActions = {
  __typename: "DiagnosisAndActionsConnection",
  totalCount: number,
  edges: ?Array<?diagnosisAndActions_diagnosisAndActions_edges>,
  pageInfo: diagnosisAndActions_diagnosisAndActions_pageInfo,
};

export type diagnosisAndActions = {
  diagnosisAndActions: diagnosisAndActions_diagnosisAndActions
};

export type diagnosisAndActionsVariables = {
  first: number,
  after?: ?string,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: student
// ====================================================

export type student_student = {
  __typename: "Student",
  id: string,
  name: ?string,
  dateOfBirth: ?any,
  schoolId: string,
  createdAt: ?any,
};

export type student = {
  student: ?student_student
};

export type studentVariables = {
  id: string
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Case
// ====================================================

export type Case = {
  __typename: "Case",
  id: string,
  surveyId: ?string,
  toothNumber: ?number,
  diagnosisAndActionId: ?string,
  createdAt: ?any,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DiagnosisAndAction
// ====================================================

export type DiagnosisAndAction = {
  __typename: "DiagnosisAndAction",
  id: string,
  diagnosis: ?string,
  action: ?string,
  createdAt: ?any,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PageInfo
// ====================================================

export type PageInfo = {
  __typename: "PageInfo",
  startCursor: ?string,
  endCursor: ?string,
  hasNextPage: boolean,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: School
// ====================================================

export type School_students = {
  __typename: "Student",
  id: string,
  name: ?string,
  dateOfBirth: ?any,
  schoolId: string,
  createdAt: ?any,
};

export type School = {
  __typename: "School",
  id: string,
  name: ?string,
  students: ?Array<?School_students>,
  createdAt: ?any,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Student
// ====================================================

export type Student = {
  __typename: "Student",
  id: string,
  name: ?string,
  dateOfBirth: ?any,
  schoolId: string,
  createdAt: ?any,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Survey
// ====================================================

export type Survey_cases = {
  __typename: "Case",
  id: string,
  surveyId: ?string,
  toothNumber: ?number,
  diagnosisAndActionId: ?string,
  createdAt: ?any,
};

export type Survey = {
  __typename: "Survey",
  id: string,
  studentId: ?string,
  surveyorId: ?string,
  date: ?any,
  s1q1: ?string,
  s1q2: ?string,
  s1q3: ?string,
  s1q4: ?string,
  s1q5: ?string,
  s1q6: ?string,
  s1q7: ?string,
  s2q1: ?string,
  s2q2: ?string,
  s2q3: ?string,
  s2q4: ?string,
  s2q5: ?string,
  s2q6: ?string,
  s2q7: ?string,
  s2q8: ?string,
  s2q9: ?string,
  lowerD: ?number,
  lowerE: ?number,
  lowerF: ?number,
  upperD: ?number,
  upperM: ?number,
  upperF: ?number,
  subjectiveScore: ?number,
  createdAt: ?any,
  cases: ?Array<?Survey_cases>,
};


/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: User
// ====================================================

export type User_roles = {
  __typename: "Role",
  id: string,
  name: ?string,
};

export type User = {
  __typename: "User",
  id: string,
  email: ?string,
  password: ?string,
  ipAddress: ?string,
  createdAt: ?any,
  roles: ?Array<?User_roles>,
};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export type SurveyInput = {|
  studentId?: ?string,
  surveyorId?: ?string,
  date?: ?any,
  s1q1?: ?string,
  s1q2?: ?string,
  s1q3?: ?string,
  s1q4?: ?string,
  s1q5?: ?string,
  s1q6?: ?string,
  s1q7?: ?string,
  s2q1?: ?string,
  s2q2?: ?string,
  s2q3?: ?string,
  s2q4?: ?string,
  s2q5?: ?string,
  s2q6?: ?string,
  s2q7?: ?string,
  s2q8?: ?string,
  s2q9?: ?string,
  lowerD?: ?number,
  lowerE?: ?number,
  lowerF?: ?number,
  upperD?: ?number,
  upperM?: ?number,
  upperF?: ?number,
  cases?: ?Array<?CaseInput>,
|};

export type CaseInput = {|
  toothNumber?: ?number,
  diagnosisAndActionId?: ?string,
|};

//==============================================================
// END Enums and Input Objects
//==============================================================
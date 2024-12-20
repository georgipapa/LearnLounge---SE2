'use strict';

// Centralized example data
const exampleUser = {
  lastName: "lastName",
  country: "country",
  gender: "gender",
  languages: ["languages", "languages"],
  rating: 6.027456183070403,
  description: "description",
  dateOfBirth: "2000-01-23T00:00:00.000Z",
  otherRelevantInformation: ["otherRelevantInformation", "otherRelevantInformation"],
  title: "title",
  userId: 0,
  firstName: "firstName",
  coursesTaught: [null, null],
  certificates: [{
    courseName: "courseName",
    teacherName: "teacherName",
    certificateId: 1,
    studentName: "studentName",
    grade: "grade",
    completionDate: "2000-01-23T00:00:00.000Z",
    otherRelevantInformation: ["otherRelevantInformation", "otherRelevantInformation"]
  }],
  specialization: "specialization",
  middleName: "middleName",
  coursesAttended: [{
    summary: "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
    schedule: "2000-01-23T04:56:07.000Z",
    image: "",
    endDate: "2024-05-31T00:00:00.000Z",
    successRate: 95,
    price: 10,
    name: "Software Engineering I",
    id: 17,
    customInfo: "customInfo"
  }],
  username: "username"
};

const exampleCourse = {
  summary: "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
  schedule: "2000-01-23T04:56:07.000Z",
  image: "",
  endDate: "2024-05-31T00:00:00.000Z",
  successRate: 95,
  price: 10,
  name: "Software Engineering I",
  id: 17,
  customInfo: "customInfo"
};

// Utility function to resolve examples
function resolveExample(example) {
  return new Promise((resolve) => {
    resolve(example);
  });
}

/**
 * Edit personal information
 * Edit personal information for a specific user.
 *
 * body User User model
 * userId String 
 * returns User
 **/
exports.edit_personal_information = function(body, userId) {
  return resolveExample(exampleUser);
}

/**
 * Enroll in a course
 * Enroll the user in a new course.
 *
 * body Course Course object that needs to be added or updated
 * userId String 
 * returns Course
 **/
exports.enroll_in_course = function(body, userId) {
  return resolveExample(exampleCourse);
}

/**
 * Enter personal information
 * A user must be able to Enter his personal information 
 *
 * body User User model
 * userId String The unique ID of the user
 * returns User
 **/
exports.enter_personal_information = function(body, userId) {
  return resolveExample(exampleUser);
}

/**
 * Get user profile
 * The logged-in user should be able to view another user's profile, including personal information and information such as the courses they have taken or taught.
 *
 * userId String The unique ID of the user
 * returns User
 **/
exports.get_user = function(userId) {
  return resolveExample(exampleUser);
}

/**
 * Unenroll from a course
 * Unenroll the user from a course.
 *
 * userId String 
 * courseId String 
 * returns Course
 **/
exports.unenroll_from_course = function(userId, courseId) {
  return resolveExample(exampleCourse);
}

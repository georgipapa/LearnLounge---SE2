'use strict';


/**
 * Connect to the course’s voice and video channels
 * Connect to the course’s voice and video channels
 *
 * courseId String The unique ID of the course
 * returns inline_response_200
 **/
exports.connect_to_course = function(courseId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "message" : "Connected to the course’s voice and video channels"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Create your own course
 * Create a course
 *
 * body Course Course object that needs to be added or updated
 * returns Course
 **/
exports.create_course = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "summary" : "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
  "schedule" : "2000-01-23T04:56:07.000Z",
  "image" : "",
  "endDate" : "2024-05-31T00:00:00.000Z",
  "successRate" : 95,
  "price" : 10,
  "name" : "Software Engineering I",
  "id" : 17,
  "customInfo" : "customInfo"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete your course
 * Delete your course as a teacher.
 *
 * courseId String The unique ID of the course
 * no response value expected for this operation
 **/
exports.delete_course = function(courseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Download course files
 * Download files associated with the course
 *
 * courseId String The unique ID of the course
 * returns byte[]
 **/
exports.download_course_files = function(courseId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = "";
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit your course's information
 * Edit your course as a teacher
 *
 * body Course Course object that needs to be added or updated
 * courseId String The unique ID of the course
 * returns Course
 **/
exports.edit_course = function(body,courseId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "summary" : "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
  "schedule" : "2000-01-23T04:56:07.000Z",
  "image" : "",
  "endDate" : "2024-05-31T00:00:00.000Z",
  "successRate" : 95,
  "price" : 10,
  "name" : "Software Engineering I",
  "id" : 17,
  "customInfo" : "customInfo"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get course details
 * The user should be able to view the details of a course before choosing to enroll in the course. This includes the duration of the course, the schedule of the course, the content to be covered, the pass rate of the students, the name of the teacher, the price (if any) and other relevant information deemed necessary by the teacher
 *
 * courseId String The ID of the course
 * returns Course
 **/
exports.get_course_details = function(courseId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "summary" : "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
  "schedule" : "2000-01-23T04:56:07.000Z",
  "image" : "",
  "endDate" : "2024-05-31T00:00:00.000Z",
  "successRate" : 95,
  "price" : 10,
  "name" : "Software Engineering I",
  "id" : 17,
  "customInfo" : "customInfo"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Issue course completion certificate
 * The teacher should be able to provide the student with a certificate that the student has successfully completed the course. This certificate may include the necessary details such as the title of the course, the student's name, the date of completion, the grade and other relevant details. In addition, the student's success in the course shall be added to the student's profile.
 *
 * body Certificate Issue a certificate (optional)
 * courseId String The ID of the course
 * no response value expected for this operation
 **/
exports.issue_certificate = function(body,courseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Review the teacher’s performance
 * Submit a review of the teacher’s performance
 *
 * body Review Review details
 * courseId String The unique ID of the course
 * no response value expected for this operation
 **/
exports.review_teacher = function(body,courseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Search Courses based on title and categories
 * Search Courses
 *
 * body SearchCourses Search a course by keyword (optional)
 * returns inline_response_200_1
 **/
exports.search_courses = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "courses" : [ {
    "summary" : "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
    "schedule" : "2000-01-23T04:56:07.000Z",
    "image" : "",
    "endDate" : "2024-05-31T00:00:00.000Z",
    "successRate" : 95,
    "price" : 10,
    "name" : "Software Engineering I",
    "id" : 17,
    "customInfo" : "customInfo"
  }, {
    "summary" : "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
    "schedule" : "2000-01-23T04:56:07.000Z",
    "image" : "",
    "endDate" : "2024-05-31T00:00:00.000Z",
    "successRate" : 95,
    "price" : 10,
    "name" : "Software Engineering I",
    "id" : 17,
    "customInfo" : "customInfo"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Watch the live lecture
 * Watch the live lecture of the course
 *
 * courseId String The unique ID of the course
 * returns Object
 **/
exports.watch_live_lecture = function(courseId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Write to the text channels
 * Write messages to the course’s text channels
 *
 * body CourseId_text_body Message to send
 * courseId String The unique ID of the course
 * no response value expected for this operation
 **/
exports.write_to_text_channels = function(body,courseId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


// Centralize the shared example data
const courseExample = {
  "summary": "This course introduces techniques for designing and developing small to medium software programs, covering the software lifecycle, user requirements, specification, design and implementation.",
  "schedule": "2000-01-23T04:56:07.000Z",
  "image": "",
  "endDate": "2024-05-31T00:00:00.000Z",
  "successRate": 95,
  "price": 10,
  "name": "Software Engineering I",
  "id": 17,
  "customInfo": "customInfo"
};

'use strict';

/**
 * Connect to the course’s voice and video channels
 *
 * courseId String The unique ID of the course
 * returns inline_response_200
 **/
exports.connect_to_course = function(_courseId) {
  return new Promise(function(resolve, _reject) {
    var examples = {};
    examples['application/json'] = {
      "message": "Connected to the course’s voice and video channels"
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
 *
 * body Course Course object that needs to be added or updated
 * returns Course
 **/
exports.create_course = function(_body) {
  return new Promise(function(resolve, _reject) {
    resolve(courseExample);
  });
}

/**
 * Delete your course
 *
 * courseId String The unique ID of the course
 * no response value expected for this operation
 **/
exports.delete_course = function(_courseId) {
  return new Promise(function(resolve, _reject) {
    resolve();
  });
}

/**
 * Download course files
 *
 * courseId String The unique ID of the course
 * returns byte[]
 **/
exports.download_course_files = function(_courseId) {
  return new Promise(function(resolve, _reject) {
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
 *
 * body Course Course object that needs to be added or updated
 * courseId String The unique ID of the course
 * returns Course
 **/
exports.edit_course = function(_body, _courseId) {
  return new Promise(function(resolve, _reject) {
    resolve(courseExample);
  });
}

/**
 * Get course details
 *
 * courseId String The ID of the course
 * returns Course
 **/
exports.get_course_details = function(_courseId) {
  return new Promise(function(resolve, _reject) {
    resolve(courseExample);
  });
}

/**
 * Issue course completion certificate
 *
 * body Certificate Issue a certificate (optional)
 * courseId String The ID of the course
 * no response value expected for this operation
 **/
exports.issue_certificate = function(_body, _courseId) {
  return new Promise(function(resolve, _reject) {
    resolve();
  });
}

/**
 * Review the teacher’s performance
 *
 * body Review Review details
 * courseId String The unique ID of the course
 * no response value expected for this operation
 **/
exports.review_teacher = function(_body, _courseId) {
  return new Promise(function(resolve, _reject) {
    resolve();
  });
}

/**
 * Search Courses based on title and categories
 *
 * body SearchCourses Search a course by keyword (optional)
 * returns inline_response_200_1
 **/
exports.search_courses = function(_body) {
  return new Promise(function(resolve, _reject) {
    var examples = {};
    examples['application/json'] = {
      "courses": [courseExample]
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
 *
 * courseId String The unique ID of the course
 * returns Object
 **/
exports.watch_live_lecture = function(_courseId) {
  return new Promise(function(resolve, _reject) {
    var examples = {};
    examples['application/json'] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

/**
 * Write to the text channels
 *
 * body CourseId_text_body Message to send
 * courseId String The unique ID of the course
 * no response value expected for this operation
 **/
exports.write_to_text_channels = function(_body, _courseId) {
  return new Promise(function(resolve, _reject) {
    resolve();
  });
}

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
 * returns inline_response_200
 **/
exports.connect_to_course = function() {
  return new Promise(function(resolve, _) {
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
 * returns Course
 **/
exports.create_course = function() {
  return new Promise(function(resolve, _) {
    resolve(courseExample);
  });
}

/**
 * Delete your course
 *
 * no response value expected for this operation
 **/
exports.delete_course = function() {
  return new Promise(function(resolve, _) {
    resolve();
  });
}

/**
 * Download course files
 *
 * returns byte[]
 **/
exports.download_course_files = function() {
  return new Promise(function(resolve, _) {
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
 * returns Course
 **/
exports.edit_course = function() {
  return new Promise(function(resolve, _) {
    resolve(courseExample);
  });
}

/**
 * Get course details
 *
 * returns Course
 **/
exports.get_course_details = function() {
  return new Promise(function(resolve, _) {
    resolve(courseExample);
  });
}

/**
 * Issue course completion certificate
 *
 * no response value expected for this operation
 **/
exports.issue_certificate = function() {
  return new Promise(function(resolve, _) {
    resolve();
  });
}

/**
 * Review the teacher’s performance
 *
 * no response value expected for this operation
 **/
exports.review_teacher = function() {
  return new Promise(function(resolve, _) {
    resolve();
  });
}

/**
 * Search Courses based on title and categories
 *
 * returns inline_response_200_1
 **/
exports.search_courses = function() {
  return new Promise(function(resolve, _) {
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
 * returns Object
 **/
exports.watch_live_lecture = function() {
  return new Promise(function(resolve, _) {
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
 **/
exports.write_to_text_channels = function() {
  return new Promise(function(resolve, _) {
    resolve();
  });
}

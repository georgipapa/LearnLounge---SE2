'use strict';

var utils = require('../utils/writer.js');
var Course = require('../service/CourseService');

module.exports.connect_to_course = function connect_to_course (req, res, next, courseId) {
  Course.connect_to_course(courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.create_course = function create_course (req, res, next, body) {
  Course.create_course(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.delete_course = function delete_course (req, res, next, courseId) {
  Course.delete_course(courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.download_course_files = function download_course_files (req, res, next, courseId) {
  Course.download_course_files(courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.edit_course = function edit_course (req, res, next, body, courseId) {
  Course.edit_course(body, courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_course_details = function get_course_details (req, res, next, courseId) {
  Course.get_course_details(courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.issue_certificate = function issue_certificate (req, res, next, body, courseId) {
  Course.issue_certificate(body, courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.review_teacher = function review_teacher (req, res, next, body, courseId) {
  Course.review_teacher(body, courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.search_courses = function search_courses (req, res, next, body) {
  Course.search_courses(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.watch_live_lecture = function watch_live_lecture (req, res, next, courseId) {
  Course.watch_live_lecture(courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.write_to_text_channels = function write_to_text_channels (req, res, next, body, courseId) {
  Course.write_to_text_channels(body, courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

'use strict';

// Import necessary utilities and services
var utils = require('../utils/writer.js');
var User = require('../service/UserService');

// Updates personal information of a user
module.exports.edit_personal_information = function edit_personal_information(req, res, next, body, userId) {
  User.edit_personal_information(body, userId)
    .then(function (response) {
      // Send the success response as JSON
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Send the error response as JSON
      utils.writeJson(res, response);
    });
};

// Enrolls a user in a course
module.exports.enroll_in_course = function enroll_in_course(req, res, next, body, userId) {
  User.enroll_in_course(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Submits personal information for a user
module.exports.enter_personal_information = function enter_personal_information(req, res, next, body, userId) {
  User.enter_personal_information(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Retrieves details of a specific user
module.exports.get_user = function get_user(req, res, next, userId) {
  User.get_user(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Unenrolls a user from a specific course
module.exports.unenroll_from_course = function unenroll_from_course(req, res, next, userId, courseId) {
  User.unenroll_from_course(userId, courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

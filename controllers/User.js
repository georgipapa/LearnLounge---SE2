'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.edit_personal_information = function edit_personal_information (req, res, next, body, userId) {
  User.edit_personal_information(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.enroll_in_course = function enroll_in_course (req, res, next, body, userId) {
  User.enroll_in_course(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.enter_personal_information = function enter_personal_information (req, res, next, body, userId) {
  User.enter_personal_information(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.get_user = function get_user (req, res, next, userId) {
  User.get_user(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.unenroll_from_course = function unenroll_from_course (req, res, next, userId, courseId) {
  User.unenroll_from_course(userId, courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

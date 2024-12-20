'use strict';

// Import necessary utilities and services
var utils = require('../utils/writer.js');
var Payment = require('../service/PaymentService');

// Handles payment processing for a specific course
module.exports.courses_course_id_pay_post = function courses_course_id_pay_post(req, res, next, body, courseId) {
  Payment.courses_course_id_pay_post(body, courseId)
    .then(function (response) {
      // Send the successful payment response as JSON
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      // Send the error response as JSON
      utils.writeJson(res, response);
    });
};

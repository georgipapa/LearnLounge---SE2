'use strict';

var utils = require('../utils/writer.js');
var Payment = require('../service/PaymentService');

module.exports.courses_course_id_pay_post = function courses_course_id_pay_post (req, res, next, body, courseId) {
  Payment.courses_course_id_pay_post(body, courseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

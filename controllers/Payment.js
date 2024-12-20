'use strict';

const utils = require('../utils/writer.js');
const Payment = require('../service/PaymentService');

/**
 * Utility function to handle response promises
 * @param {Object} res - Response object
 * @param {Promise} promise - The promise to handle
 */
const handleResponse = (res, promise) => {
  promise
    .then(response => utils.writeJson(res, response))
    .catch(error => utils.writeJson(res, error));
};

/**
 * Handles payment for a specific course
 * @param {Object} params - The parameters for the request
 * @param {Object} params.res - Response object
 * @param {Object} params.body - Request body
 * @param {string} params.courseId - Course ID
 */
module.exports.courses_course_id_pay_post = function courses_course_id_pay_post({ res, body, courseId }) {
  handleResponse(res, Payment.courses_course_id_pay_post(body, courseId));
};

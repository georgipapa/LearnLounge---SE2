'use strict';

const utils = require('../utils/writer.js');
const User = require('../service/UserService');

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

module.exports = {
  /**
   * Updates the personal information of a user
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Updated personal information
   * @param {string} params.userId - ID of the user to update
   */
  edit_personal_information({ res, body, userId }) {
    handleResponse(res, User.edit_personal_information(body, userId));
  },

  /**
   * Enrolls a user in a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Enrollment details
   * @param {string} params.userId - ID of the user to enroll
   */
  enroll_in_course({ res, body, userId }) {
    handleResponse(res, User.enroll_in_course(body, userId));
  },

  /**
   * Submits personal information for a user
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Personal information to submit
   * @param {string} params.userId - ID of the user to update
   */
  enter_personal_information({ res, body, userId }) {
    handleResponse(res, User.enter_personal_information(body, userId));
  },

  /**
   * Retrieves details of a specific user
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.userId - ID of the user to retrieve
   */
  get_user({ res, userId }) {
    handleResponse(res, User.get_user(userId));
  },

  /**
   * Unenrolls a user from a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.userId - ID of the user to unenroll
   * @param {string} params.courseId - ID of the course to unenroll from
   */
  unenroll_from_course({ res, userId, courseId }) {
    handleResponse(res, User.unenroll_from_course(userId, courseId));
  }
};

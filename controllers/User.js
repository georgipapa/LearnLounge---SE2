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
   * Edit personal information of a user
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Request body
   * @param {string} params.userId - User ID
   */
  edit_personal_information({ res, body, userId }) {
    handleResponse(res, User.edit_personal_information(body, userId));
  },

  /**
   * Enroll a user in a course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Request body
   * @param {string} params.userId - User ID
   */
  enroll_in_course({ res, body, userId }) {
    handleResponse(res, User.enroll_in_course(body, userId));
  },

  /**
   * Enter personal information for a user
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Request body
   * @param {string} params.userId - User ID
   */
  enter_personal_information({ res, body, userId }) {
    handleResponse(res, User.enter_personal_information(body, userId));
  },

  /**
   * Get details of a user
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.userId - User ID
   */
  get_user({ res, userId }) {
    handleResponse(res, User.get_user(userId));
  },

  /**
   * Unenroll a user from a course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.userId - User ID
   * @param {string} params.courseId - Course ID
   */
  unenroll_from_course({ res, userId, courseId }) {
    handleResponse(res, User.unenroll_from_course(userId, courseId));
  }
};

'use strict';

const utils = require('../utils/writer.js');
const Course = require('../service/CourseService');

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
   * Connect to a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.courseId - ID of the course to connect to
   */
  connect_to_course({ res, courseId }) {
    handleResponse(res, Course.connect_to_course(courseId));
  },

  /**
   * Create a new course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Details of the course to be created
   */
  create_course({ res, body }) {
    handleResponse(res, Course.create_course(body));
  },

  /**
   * Delete a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.courseId - ID of the course to delete
   */
  delete_course({ res, courseId }) {
    handleResponse(res, Course.delete_course(courseId));
  },

  /**
   * Download files related to a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.courseId - ID of the course whose files are to be downloaded
   */
  download_course_files({ res, courseId }) {
    handleResponse(res, Course.download_course_files(courseId));
  },

  /**
   * Edit details of a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Updated course details
   * @param {string} params.courseId - ID of the course to edit
   */
  edit_course({ res, body, courseId }) {
    handleResponse(res, Course.edit_course(body, courseId));
  },

  /**
   * Get details of a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.courseId - ID of the course to retrieve details of
   */
  get_course_details({ res, courseId }) {
    handleResponse(res, Course.get_course_details(courseId));
  },

  /**
   * Issue a certificate for a course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Certificate issuance details
   * @param {string} params.courseId - ID of the course for the certificate
   */
  issue_certificate({ res, body, courseId }) {
    handleResponse(res, Course.issue_certificate(body, courseId));
  },

  /**
   * Review a teacher for a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Teacher review details
   * @param {string} params.courseId - ID of the course the teacher is associated with
   */
  review_teacher({ res, body, courseId }) {
    handleResponse(res, Course.review_teacher(body, courseId));
  },

  /**
   * Search for courses based on criteria
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Search criteria
   */
  search_courses({ res, body }) {
    handleResponse(res, Course.search_courses(body));
  },

  /**
   * Watch a live lecture for a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {string} params.courseId - ID of the course for the live lecture
   */
  watch_live_lecture({ res, courseId }) {
    handleResponse(res, Course.watch_live_lecture(courseId));
  },

  /**
   * Write to text channels for a specific course
   * @param {Object} params - Request parameters
   * @param {Object} params.res - Response object
   * @param {Object} params.body - Message content
   * @param {string} params.courseId - ID of the course whose text channel is to be written to
   */
  write_to_text_channels({ res, body, courseId }) {
    handleResponse(res, Course.write_to_text_channels(body, courseId));
  }
};

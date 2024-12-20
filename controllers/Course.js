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
  connect_to_course({ res, courseId }) {
    handleResponse(res, Course.connect_to_course(courseId));
  },

  create_course({ res, body }) {
    handleResponse(res, Course.create_course(body));
  },

  delete_course({ res, courseId }) {
    handleResponse(res, Course.delete_course(courseId));
  },

  download_course_files({ res, courseId }) {
    handleResponse(res, Course.download_course_files(courseId));
  },

  edit_course({ res, body, courseId }) {
    handleResponse(res, Course.edit_course(body, courseId));
  },

  get_course_details({ res, courseId }) {
    handleResponse(res, Course.get_course_details(courseId));
  },

  issue_certificate({ res, body, courseId }) {
    handleResponse(res, Course.issue_certificate(body, courseId));
  },

  review_teacher({ res, body, courseId }) {
    handleResponse(res, Course.review_teacher(body, courseId));
  },

  search_courses({ res, body }) {
    handleResponse(res, Course.search_courses(body));
  },

  watch_live_lecture({ res, courseId }) {
    handleResponse(res, Course.watch_live_lecture(courseId));
  },

  write_to_text_channels({ res, body, courseId }) {
    handleResponse(res, Course.write_to_text_channels(body, courseId));
  }
};

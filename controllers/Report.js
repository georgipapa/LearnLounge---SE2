'use strict';

var utils = require('../utils/writer.js');
var Report = require('../service/ReportService');

module.exports.report_post = function report_post (req, res, next, body) {
  Report.report_post(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

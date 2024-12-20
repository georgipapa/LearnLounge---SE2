'use strict';

const utils = require('../utils/writer.js');
const Report = require('../service/ReportService');

// Email validation helper function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Field length validation helper function
function isValidLength(field, maxLength) {
    return typeof field === 'string' && field.length <= maxLength;
}

module.exports.report_post = function report_post(req, res, next, body) {
    // Extract fields
    const { typeOfReport, name, message, email } = body;

    // Validate missing fields
    if (!typeOfReport || !name || !message || !email) {
        return utils.writeJson(res, {
            message: 'Missing required fields: typeOfReport, name, message, or email',
        }, 400);
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return utils.writeJson(res, { message: 'Invalid email format' }, 400);
    }

    // Validate field lengths
    const maxLengths = {
        typeOfReport: 1000,
        name: 1000,
        message: 5000,
        email: 320, // Standard max email length
    };

    for (const [field, maxLength] of Object.entries(maxLengths)) {
        if (!isValidLength(body[field], maxLength)) {
            return utils.writeJson(res, { message: 'Invalid input size' }, 400);
        }
    }

    // Delegate to service layer
    Report.report_post(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

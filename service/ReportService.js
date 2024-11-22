'use strict';


/**
 * Contact system developers
 * The user is given the opportunity to communicate with the designers so that they can be facilitated in case they encounter a difficulty, suggest changes to system upgrades and report a bug or inappropriate content.
 *
 * body Report Report request model
 * returns Report
 **/
exports.report_post = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "typeOfReport" : "typeOfReport",
  "name" : "name",
  "message" : "message",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


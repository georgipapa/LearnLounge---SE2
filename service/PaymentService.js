'use strict';


/**
 * Pay for a course
 * If the course is not free, the student can pay for it
 *
 * body Payment Payment request model
 * courseId String The unique ID of the course
 * returns Payment
 **/
exports.courses_course_id_pay_post = function(_body,_courseId) {
  return new Promise(function(resolve, _reject) {
    var examples = {};
    examples['application/json'] = {
  "reason" : "reason",
  "amount" : 0.8008282,
  "ispaid" : true,
  "paymentMethod" : "paymentMethod"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Generates the base payload for user information.
 * This can be extended or customized as needed.
 * @returns {Object} The base user payload.
 */
function generateBaseUserPayload() {
    return {
        firstName: "John",
        lastName: "Doe",
        middleName: "Michael",
        username: "johndoe123",
        country: "USA",
        gender: "Male",
        languages: ["English", "Spanish"],
        rating: 4.8,
        description: "Experienced software engineer.",
        dateOfBirth: "1990-05-15",
        title: "Mr.",
        userId: 13,
        specialization: "Software Engineering",
    };
}

/**
 * Adds courses taught by the user to the payload.
 * @param {Object} payload - The base user payload.
 * @returns {Object} Updated payload with courses taught.
 */
function addCoursesTaught(payload) {
    return {
        ...payload,
        coursesTaught: [
            {
                name: "Advanced Programming",
                description: "Detailed programming course",
                summary: "In-depth programming techniques.",
                schedule: "2023-01-01T10:00:00.000Z",
                endDate: "2023-12-31T10:00:00.000Z",
                price: 150,
            },
        ],
    };
}

/**
 * Adds certificates earned by the user to the payload.
 * @param {Object} payload - The base user payload.
 * @returns {Object} Updated payload with certificates.
 */
function addCertificates(payload) {
    return {
        ...payload,
        certificates: [
            {
                courseName: "Data Science Basics",
                teacherName: "Dr. Alan",
                certificateId: 202,
                studentName: "John Doe",
                grade: "A",
                completionDate: "2020-05-15",
                otherRelevantInformation: ["Certificate of Completion"],
            },
        ],
    };
}

/**
 * Adds courses attended by the user to the payload.
 * @param {Object} payload - The base user payload.
 * @returns {Object} Updated payload with attended courses.
 */
function addCoursesAttended(payload) {
    return {
        ...payload,
        coursesAttended: [
            {
                name: "Software Engineering Basics",
                summary: "Basic Software Engineering Concepts",
                schedule: "2022-02-01T10:00:00.000Z",
                endDate: "2022-06-01T00:00:00.000Z",
                successRate: 95,
                price: 0,
                id: 5,
                customInfo: "Online course",
            },
        ],
    };
}


module.exports = { 
    generateBaseUserPayload, 
    addCoursesTaught, 
    addCertificates, 
    addCoursesAttended
};

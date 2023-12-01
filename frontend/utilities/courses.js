export const getCourses = (roles = []) => {
    /** Gets all courses that a user belongs to with respect to the roles that they are in.
     *
     * @param roles An optional array of roles to validate whether a user belongs to a course
     * with a given role.
     *
     * @returns An array of courses that the user belongs to: [{courseLabel: CSC108, courseId: 1}]
     */
    const lowerCaseRoles = roles.map((role) => role.toLowerCase());
    const courses = JSON.parse(sessionStorage.getItem('roles'));
    let courseOptions = [];

    courses.forEach((course) => {
        // Filter for role specific courses
        if (lowerCaseRoles && lowerCaseRoles.includes(course.role.toLowerCase())) {
            courseOptions.push({ label: course.course_code, course_id: course.course_id });
        } else {
            courseOptions.push({ label: course.course_code, course_id: course.course_id });
        }
    });
    return courseOptions;
};

export const getCourseIdFromName = (courseName) => {
    /**
     * Gets the course id associated with courseName
     *
     * @param courseName: The name of the course whos id to find
     *
     * @returns An int representing the course id or null if none exist.
     */

    const courses = getCourses();
    console.log(courseName);

    courses.forEach((course) => {
        if (courseName.toLowerCase() === course.label.toLowerCase()) {
            return course.course_id;
        }
    });
    return null;
};

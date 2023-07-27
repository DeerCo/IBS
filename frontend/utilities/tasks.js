import InstructorApi from '../src/api/instructor_api';
export const getTasks = (courseId) => {
    /** Gets all tasks in a course
     *
     * @param courseId The id of a course
     *
     * @return An array of objects containing the course code and id: [{courseCode: 'CSC108', courseId: '1'}]
     */

    let tasks = [];
    InstructorApi.allTasks(courseId)
        .then((res) => {
            res.task.forEach((task) => {
                tasks.push({ label: task.task });
            });
        })
        .catch((err) => {
            console.log(err);
        });

    return tasks;
};

import { getCourses } from "./courses";
import TaApi from "../api/ta_api";
import { INSTRUCTOR } from "../Constants/roles";

export const getGroups = task => {
    /** Gets all groups for a particular task
     * 
     * @returns An object of lists containing groups: {groups: [[student1, student2, student3], ...]}
     */ 
    let groupsPerTask = {}
    let instructorCourses = getCourses(INSTRUCTOR)
    instructorCourses.forEach(course => {
        let tasksPerCourse = TaApi.all_tasks(course);

        let courseId = course.toString()

        //TODO what is the format of all_tasks?
        //TODO what is the format of all_groups?
        groupsPerTask[courseId] = [];
        let allGroupsPerTask = tasksPerCourse.map(task => {
            return 
        })
        groupsPerTaskPerCourse[courseId].push(allGroupsPerTask);
    })
}
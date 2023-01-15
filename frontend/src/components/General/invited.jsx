import StudentApi from "../../api/student_api";

const Invited = (props) => {
  return (
    <>
      <button
        onClick={() => {
          StudentApi.check_group(props.course_id, props.task).then(
            (response) => {
              let group_id = response.data.group_id;
              StudentApi.accept(props.course_id, group_id).then((response) => {
                props.changeGroup(group_id);
              });
            }
          );
        }}
        className="btn btn-secondary mt-3 m-3 right groupbtn"
      >
        Accept Group
      </button>
      <button
        onClick={() => {
          StudentApi.check_group(props.course_id, props.task).then(
            (response) => {
              let group_id = response.data.group_id;
              StudentApi.reject(props.course_id, group_id).then((response) => {
                props.changeGroup("");
              });
            }
          );
        }}
        className="btn btn-secondary mt-3 m-3 right groupbtn"
      >
        Reject Group
      </button>
    </>
  );
};
export default Invited;

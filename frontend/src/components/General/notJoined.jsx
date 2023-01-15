import StudentApi from "../services/auth_services";

const NotJoined = (props) => {
  return (
    <div className="comp ">
      <button
        onClick={() => {
          StudentApi.handleCreate(props.course_id, props.task).then(
            (response) => {
              StudentApi.check_group(props.course_id, props.task).then(
                (response) => {
                  changeGroup(response.data.group_id);
                }
              );
            }
          );
        }}
        className="btn btn-secondary mt-3 right groupbtn"
      >
        Create Group
      </button>
    </div>
  );
};
export default NotJoined;

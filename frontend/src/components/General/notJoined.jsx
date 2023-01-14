import StudentApi from "../services/auth_services";

const NotJoined = (props) => {
  return (
    <div className="comp ">
      <button
        onClick={() => {
          StudentApi.handleCreate(props.changeGroup);
        }}
        className="btn btn-secondary mt-3 right groupbtn"
      >
        Create Group
      </button>
    </div>
  );
};
export default NotJoined;

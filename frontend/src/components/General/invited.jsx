import StudentApi from "../services/auth_services";

const Invited = (props) => {
  return (
    <>
      <button
        onClick={() => {
          StudentApi.handleAccept(props.changeGroup);
        }}
        className="btn btn-secondary mt-3 m-3 right groupbtn"
      >
        Accept Group
      </button>
      <button
        onClick={() => {
          StudentApi.handleReject(props.changeGroup);
        }}
        className="btn btn-secondary mt-3 m-3 right groupbtn"
      >
        Reject Group
      </button>
    </>
  );
};
export default Invited;

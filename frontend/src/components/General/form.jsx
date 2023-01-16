import { useState } from "react";
import StudentApi from "../../api/student_api";

const Form = (props) => {
  const [username, setUsername] = useState("");
  const invite = "invite";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.action === invite) {
      StudentApi.invite(props.course_id, props.group_id, username)
        .then((response) => {
          props.changeMsg(response.data.message);
          StudentApi.check_group(props.course_id, props.task).then(
            (response) => {
              props.addMembers(response.data.members);
            }
          );
        })
        .catch((error) => {
          props.changeMsg(error.response.data.message);
        });
    } else {
      StudentApi.uninvite(props.course_id, props.group_id, username)
        .then((response) => {
          props.changeMsg(response.data.message);
          StudentApi.check_group(props.course_id, props.task).then(
            (response) => {
              props.addMembers(response.data.members);
            }
          );
        })
        .catch((error) => {
          props.changeMsg(error.response.data.message);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="container">
        <div class="row justify-content-between">
          <label>
            <input
              type="text"
              value={username}
              placeholder="Enter Member ID"
              onChange={(e) => {
                setUsername(e.target.value);
                props.changeMsg("");
              }}
              className="input-group-text"
            />
          </label>
          <div className="form-group row justify-content-center"></div>
          <div className="row justify-content-center ">
            <button
              type="submit"
              className="m-1 btn btn-secondary groupbtn size"
            >
              {props.action}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;

import { useState } from "react";
import axios from "axios";
import StudentApi from "../../api/student_api";

const Form = (props) => {
  const [username, setUsername] = useState("");
  let { course_id, task } = useParams();

  const invite = "invite";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.action === invite) {
      axios
        .post(
          API_URL + props.url,
          { group_id: props.group_id, username: username },
          config
        )
        .then((response) => {
          props.changeMsg(response.data.message);
          StudentApi.handleAddMembers(props.addMembers);
        })
        .catch((error) => {
          props.changeMsg(error.response.data.message);
        });
    } else {
      axios
        .delete(API_URL + props.url, {
          data: { group_id: props.group_id, username: username },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          props.changeMsg(response.data.message);
          StudentApi.handleAddMembers(props.addMembers);
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
              className="m-1 btn btn-secondary size groupbtn"
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

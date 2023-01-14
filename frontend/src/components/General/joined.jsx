import StudentApi from "../services/auth_services";
import Form from "./form";
import "../styles/style.css";
import { useState } from "react";

const Joined = (props) => {
  const course_id = localStorage.courseid;
  const inviteUrl = "/course/" + course_id + "/group/invite";
  const disinviteUrl = "/course/" + course_id + "/group/disinvite";
  const [msg, setMsg] = useState("");

  return (
    <>
      <div>
        <span className="inviteButtons container">
          <Form
            action={"invite"}
            group_id={props.group_id}
            changeMsg={setMsg}
            addMembers={props.addMembers}
          />

          <Form
            action={"uninvite"}
            group_id={props.group_id}
            changeMsg={setMsg}
            addMembers={props.addMembers}
          />
        </span>
        <div className="container">
          <div className="row">
            <div className="col-3">
              {/* <button
                onClick={() => {
                  StudentApi.handleLeaveGroup(
                    props.group_id,
                    props.changeGroup
                  );
                }}
                className="btn btn-secondary mt-3 right groupbtn"
              >
                Leave Group
              </button> */}
            </div>
            <div className="col-9">
              {msg && (
                <div className="form-group mt-3">
                  <div
                    className="alert alert-primary  "
                    role="alert"
                    style={{ width: "100%" }}
                  >
                    {msg}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Joined;

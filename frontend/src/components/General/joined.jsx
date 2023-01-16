import Form from "./form";
import "../../styles/style.css";
import { useState } from "react";

const Joined = (props) => {
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
            course_id={props.course_id}
            task={props.task}
          />

          <Form
            action={"uninvite"}
            group_id={props.group_id}
            changeMsg={setMsg}
            addMembers={props.addMembers}
            course_id={props.course_id}
            task={props.task}
          />
        </span>
        <div className="container">
          <div className="row">
            <div className="col-3"></div>
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

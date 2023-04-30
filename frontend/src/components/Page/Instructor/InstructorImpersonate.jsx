import {TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import InstructorApi from "../../../api/instructor_api";

export default function InstructorImpersonate() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  let { course_id } = useParams();


  return (
    <form onSubmit={(e) => {
      InstructorApi.impersonate(course_id, username).then(
        (response) => {
          console.log(response);
          sessionStorage.setItem("origusername", sessionStorage.getItem("username"));
          sessionStorage.setItem("origroles", sessionStorage.getItem("roles"));
          sessionStorage.setItem("origtoken", sessionStorage.getItem("token"));
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("roles", JSON.stringify(response.data.roles));
          sessionStorage.setItem("token", response.data.token);
          navigate("/home");
          navigate(0)
        }
      )
      e.preventDefault();
    }}>
      <p>Instructor Impersonate</p>
      <TextField placeholder={"Enter username"} value={username} onChange={(e) => setUsername(e.target.value)}/>
      <button>Impersonate</button>
    </form>
  )
}
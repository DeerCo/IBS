import {TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import AdminApi from "../../../api/admin_api";

export default function AdminImpersonate() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();


  return (
    <form onSubmit={(e) => {
      AdminApi.impersonate(username).then(
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
      <p>Admin Impersonate</p>
      <TextField placeholder={"Enter username"} value={username} onChange={(e) => setUsername(e.target.value)}/>
      <button>Impersonate</button>
    </form>
  )
}
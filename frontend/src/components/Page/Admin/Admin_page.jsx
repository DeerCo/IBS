import {useEffect, useState} from "react";
import AdminApi from "../../../api/admin_api";

let Admin_page = () => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    AdminApi.all_courses().then(
      (response) => {
        setCourses(JSON.stringify(response))
      }
    )
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <p>{courses}</p>
    </div>
  );
}

export default Admin_page;
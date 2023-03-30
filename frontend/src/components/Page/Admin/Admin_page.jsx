import React, {useEffect, useState} from "react";
import AdminApi from "../../../api/admin_api";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

let Admin_page = () => {
  const [courses, setCourses] = useState({});
  const { register: register1, handleSubmit: handleSubmit1 } = useForm();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const { register: register3, handleSubmit: handleSubmit3 } = useForm();
  const { register: register4, handleSubmit: handleSubmit4 } = useForm();
  const { register: register5, handleSubmit: handleSubmit5 } = useForm();
  const { register: register6, handleSubmit: handleSubmit6 } = useForm();
  const [checked, setChecked] = useState(true);
  const [role, setRole] = useState({});
  const addCourse = data => {
    AdminApi.add_course(data).then((response) => {
      console.log(response);
      toast(response.data.message);
      AdminApi.all_courses().then(
        (response) => {
          setCourses(response.data.course)
        }
      )
    })
  }
  const changeCourse = data => {
    AdminApi.change_course(data).then((response) => {
      console.log(response);
      toast(response.data.message);
      AdminApi.all_courses().then(
        (response) => {
          setCourses(response.data.course)
        }
      )
    })
  }

  const getRole = data => {
    console.log(data)
    AdminApi.get_role(data.username).then((response) => {
      console.log(response);
      toast(response.data.message);
      setRole(response.data)
    })
  }

  const addRole = data => {
    AdminApi.add_role(data).then((response) => {
      console.log(response);
      toast(response.data.message);
    })
  }

  const uploadRole = data => {
    AdminApi.add_role(data).then((response) => {
      console.log(response);
      toast(response.data.message);
    })
  }

  const deleteRole = data => {
    AdminApi.delete_role(data).then((response) => {
      console.log(response);
      toast(response.data.message);
    })
  }

  useEffect(() => {
    AdminApi.all_courses().then(
      (response) => {
        setCourses(response.data.course)
      }
    )
  }, []);

  return (
    <div style={{margin: "0.5ch", justifyContent:"left", textAlign: "left"}}>
      <h1>Admin Page</h1>
      <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, 15em)"}}>
        {courses?.map?.(data =>
          (
            <div className="col" key={data.course_id}>
              <div className="card shadow-sm m-3">
                <img src={require("../../../images/general.png")} alt="course" />

                <div className="card-body">
                  <p className="card-text">{data.course_code}</p>
                  {/*{data.role==="student" && <Link className="stretched-link button" to={"/course/" + data.course_id + "/task"}> </Link>}*/}
                  {/*{data.role==="ta" && <Link className="stretched-link button" to={"/ta/course/" + data.course_id + "/task"}> </Link>}*/}
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{data.course_session.replaceAll("_", " ")}</small>
                    {/*<small className="text-muted">{data.role.charAt(0).toUpperCase() + data.role.slice(1)}</small>*/}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>
        <h2>Change/Add Course</h2>
        <input type={"checkbox"} checked={checked} onChange={() => setChecked((c) => !c)}></input>
        <p>{checked ? 'add course' : 'change course'}</p>
        {checked ?
          <form onSubmit={handleSubmit1(addCourse)}>
            <p>course_code</p>
            <input {...register1("course_code")} />
            <p>course_session</p>
            <input {...register1("course_session")} />
            <p>gitlab_group_id</p>
            <input {...register1("gitlab_group_id")} />
            <p>default_token_count</p>
            <input {...register1("default_token_count")} />
            <p>token_length</p>
            <input {...register1("token_length")} />
            <p>hidden</p>
            <input {...register1("hidden")} />
            <p></p>
            <input type="submit" />
          </form> :
          <form onSubmit={handleSubmit2(changeCourse)}>
            <p>course_id</p>
            <input {... register2("course_id")} />
            <p>course_code</p>
            <input {...register2("course_code")} />
            <p>course_session</p>
            <input {...register2("course_session")} />
            <p>gitlab_group_id</p>
            <input {...register2("gitlab_group_id")} />
            <p>default_token_count</p>
            <input {...register2("default_token_count")} />
            <p>token_length</p>
            <input {...register2("token_length")} />
            <p>hidden</p>
            <input {...register2("hidden")} />
            <p></p>
            <input type="submit" />
          </form>
        }
      </div>
      <div>
        <h2>Get role</h2>
        <form onSubmit={handleSubmit3(getRole)}>
          <input {...register3("username")} />
          <p style={{whiteSpace: "pre-wrap"}}>{JSON.stringify(role, null, 2)}</p>
          <input type={"submit"}/>
        </form>
      </div>
      <div>
        <h2>Add role</h2>
        <form onSubmit={handleSubmit4(addRole)}>
          <p>course_id</p>
          <input {...register4("course_id")}></input>
          <p>username</p>
          <input {...register4("username")}></input>
          <p>role</p>
          <input {...register4("role")}></input>
          <p>email</p>
          <input {...register4("email")}></input>
          <p>update_user_info</p>
          <input {...register4("update_user_info")}></input>
          <p></p>
          <input type={"submit"}/>
        </form>
      </div>
      <div>
        <h2>Upload roles</h2>
        <form onSubmit={handleSubmit5(uploadRole)}>
          <p>course_id</p>
          <input {...register5("course_id")}></input>
          <p>file</p>
          <input type={"file"} {...register5("file")} multiple={true}></input>
          <p>role</p>
          <input {...register5("role")}></input>
          <p></p>
          <input type={"submit"}/>
        </form>
      </div>
      <div>
        <h2>Delete role</h2>
        <form onSubmit={handleSubmit6(deleteRole)}>
          <p>course_id</p>
          <input {...register6("course_id")}></input>
          <p>username</p>
          <input {...register6("username")}></input>
          <p></p>
          <input type={"submit"}/>
        </form>
      </div>
    </div>
  );
}

export default Admin_page;
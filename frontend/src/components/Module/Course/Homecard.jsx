import {Link} from "react-router-dom";
import React from "react";

const Homecard = ({data}) => {
  return (<div className="col" key={data.course_id}>
    <div className="card shadow-sm m-3">
      <img src={require("../../../images/general.png")} alt="course"/>

      <div className="card-body">
        <p className="card-text">{data.course_code}</p>
        {data.role === "student" &&
          <Link className="stretched-link button" to={"/course/" + data.course_id + "/task"}> </Link>}
        {data.role === "ta" &&
          <Link className="stretched-link button" to={"/ta/course/" + data.course_id + "/task"}> </Link>}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">{data.course_session.replaceAll("_", " ")}</small>
          <small className="text-muted">{data.role.charAt(0).toUpperCase() + data.role.slice(1)}</small>
        </div>
      </div>
    </div>
  </div>)
}

export default Homecard;
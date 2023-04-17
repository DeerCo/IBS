import React from "react";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Homecard = ({data}) => {
  return (
    <Card>
      <CardActionArea component={Link}
                      to={(data.role === "ta" ? "/ta" : "") + "/course/" + data.course_id + "/task"}>
        <CardMedia
          component="img"
          height="200"
          src={require("../../../images/general.png")} alt="course"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.course_code}
          </Typography>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant="body2" color="text.secondary">
              {data.course_session.replaceAll("_", " ")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.role?.charAt(0)?.toUpperCase() + data?.role?.slice(1)}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Homecard;
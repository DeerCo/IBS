import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentApi from "../../../api/student_api";
import NavBar from "../../Module/Navigation/NavBar";
import DashboardCard from '../../FlexyMainComponents/base-card/DashboardCard';
import PageContainer from '../../FlexyMainComponents/container/PageContainer';
import { Table, TableBody, TableCell, TableRow, TableHead, Typography, IconButton, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

let StudentFilePage = () => {
  let navigate = useNavigate();
  let { course_id, task } = useParams();
  let [files, setFiles] = useState([]);

  useEffect(() => {
    StudentApi.all_files(course_id, task).then(
      (response) => {
        if (!response || !("status" in response)) {
          toast.error("Unknown error", { theme: "colored" });
        } else if (response["status"] === 200) {
          setFiles(response["data"]["files"]);
        } else if (response["status"] === 401 || response["status"] === 403) {
          toast.warn("You need to login again", { theme: "colored" });
          navigate("/login");
        } else if (response["status"] !== 400) {
          toast.error("Unknown error", { theme: "colored" });
        }
      })
  }, [course_id, task, navigate]);

  let download = (file_id, file_name) => {
    StudentApi.download_file(course_id, task, file_id, file_name).then(
      (response) => {
        if (!response || !("status" in response)) {
          toast.error("Unknown error", { theme: "colored" });
          navigate("/login");
        } else if (response["status"] === 200) {
          toast.info("Your download should start shortly", { theme: "colored" });
        } else {
          toast.warn("The selected file cannot be downloaded", { theme: "colored" });
        }
      }
    );
  };

  let download_all = () => {
    for (let file of files) {
      download(file.file_id, file.file_name.substring(file.file_name.lastIndexOf('/') + 1));
    }
  }


  return (

    <PageContainer
      title={`${task} feedback`}
      description={`Contains the feedback files for the task '${task}'`}
    >
      <NavBar page="Feedback" />

      <DashboardCard
        title={task}
        children=
        {<div>
          {files.length === 0 ? <Typography> No feedback file is available. </Typography> :
            <div>
              <Table aria-label="Files table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      File
                    </TableCell>
                    <TableCell align="right">
                      Download
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((file) => (
                    <TableRow>
                      <TableCell>
                        <Typography>
                          {file.file_name.split('/').length === 2 ? file.file_name.substring(1) : file.file_name}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="download"
                          color="primary"
                          onClick={() => { download(file.file_id, file.file_name.substring(file.file_name.lastIndexOf('/') + 1)); }}>
                          <FileDownloadIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <br />

              <Button onClick={download_all} startIcon={<FileDownloadIcon />}>Download All</Button>
            </div>}
        </div >
        } />

    </PageContainer >

  );
};


export default StudentFilePage;
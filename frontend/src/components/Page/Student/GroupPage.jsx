import { useState, useEffect } from "react";
import "../../../styles/style.css";
import { useParams } from "react-router-dom";
import Invited from "../../General/invited";
import NotJoined from "../../General/notJoined";
import Joined from "../../General/joined";
import StudentApi from "../../../api/student_api";

// allows for certain behaviours to only happen on first render
let FIRST = 0;

const GroupPage = () => {
  let { course_id, task } = useParams();

  const [comp, setComp] = useState("");
  const [group_id, setGroup_id] = useState("");
  const [members, setMembers] = useState([]);
  const [ismembers, setIsMembers] = useState(false);

  //setting up display page info
  const [git, setGit] = useState(null);
  const [due, setDue] = useState("");
  const [dueEx, setDueEx] = useState("");
  const [dueExTo, setDueExTo] = useState("");
  const [tokenLen, setTokenLen] = useState("");
  const [commit, setCommit] = useState("");
  const [commitMsg, setCommitMsg] = useState("");
  const [tokenUsed, setTokenUsed] = useState("");
  const [commitTime, setCommitTime] = useState("");
  const [maxToken, setMaxToken] = useState("");

  // after collected info
  const [collectCommit, setCollectCommit] = useState(null);
  const [collectTokenUsed, setCollectTokenUsed] = useState(null);

  // potential reponses to check group
  const msg1 = "You have joined a group.";
  const msg2 = "You are not in a group.";
  const msg3 = "You have been invited to join a group.";

  // allows for different states to stored based on the state of the page
  const ENUM_STATES = {
    joined: (
      <Joined
        group_id={group_id}
        changeGroup={setGroup_id}
        addMembers={setMembers}
        course_id={course_id}
        task={task}
      />
    ),
    notJoined: (
      <NotJoined changeGroup={setGroup_id} course_id={course_id} task={task} />
    ),
    invited: (
      <Invited changeGroup={setGroup_id} course_id={course_id} task={task} />
    ),
  };
  // set the details on the page
  useEffect(() => {
    console.log("here");
    if (FIRST === 0) {
      StudentApi.details(course_id, task).then((response) => {
        console.log(response);
        setDue(response["before_due_date"].due_date);
        setDueEx(response.data.before_due_date.due_date_with_extension);
        setDueExTo(
          response.data.before_due_date.due_date_with_extension_and_token
        );
        setMaxToken(response.data.before_due_date.max_token);
        setTokenLen(response.data.before_due_date.token_length);
        setCommit(response.data.before_due_date.commit_id);
        setCommitTime(response.data.before_due_date.commit_time);
        setCommitMsg(response.data.before_due_date.commit_message);
        setTokenUsed(response.data.before_due_date.token_used);
        if ("collected" in response.data) {
          setCollectCommit(response.data.collected.commit_id);
          setCollectTokenUsed(response.data.collected.token_used);
        }
      });
    }
    console.log(task);
    StudentApi.check_group(course_id, task).then((response) => {
      const msg = response.data.message;

      if (msg === msg1) {
        if (FIRST === 0) {
          FIRST += 1;
          setGroup_id(response.data.group_id);
        }
        let mem = response.data.members;
        setMembers(mem);
        setIsMembers(true);
        setGit(response.data.gitlab_url);
        setComp(ENUM_STATES["joined"]);
      } else if (msg === msg2) {
        console.log("I'm msg 1");
        if (FIRST === 0) {
          FIRST += 1;
          // no groupid since not in group
          setGroup_id("");
        }
        setMembers("");
        setIsMembers(false);
        setGit(null);
        setComp(ENUM_STATES["notJoined"]);
        console.log("I'm msg 2");
      } else if (msg === msg3) {
        if (FIRST === 0) {
          FIRST += 1;
          setGroup_id("");
        }
        let mem = response.data.members;
        setMembers(mem);
        setIsMembers(true);
        setGit(null);
        setComp(ENUM_STATES["invited"]);
        console.log("I'm msg 3");
      }
    });
  }, [group_id]);

  return (
    <div id="code_page">
      <script src="prism.js"></script>

      <nav id="navbar">
        <div id="inner">
          <a href="student_first_page.html">
            <p className="logo2">IBS</p>
          </a>

          <a className="button second" href="#">
            Interview
          </a>

          <a className="button" href="#">
            Files
          </a>

          <a className="button" href="#">
            Grades
          </a>

          <a className="button" href="#">
            A1
          </a>
        </div>
      </nav>

      <div className="divider"> </div>

      <div className="tabset">
        <input
          type="radio"
          name="tabset"
          id="tab1"
          aria-controls="marzen"
          checked
        />
        <label>Description</label>

        <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
        {/* <label>Submissions</label> */}

        <div className="tab-panels">
          <section id="marzen" className="tab-panel">
            <p className="aname">{task}</p>
            <div className="card-box-special row">
              <div className="col-7 my-2">
                <div className="p-3 bg-body rounded shadow-sm">
                  <h5 className="border-bottom pb-2 mb-0">Requirements</h5>
                  <div className="d-flex text-muted pt-3">
                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                      <strong className="d-block text-gray-dark">
                        Due Date
                      </strong>
                      The due date is: <b>{due}</b>
                    </p>
                  </div>
                  <div className="d-flex text-muted pt-3">
                    <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                      <strong className="d-block text-gray-dark">
                        Due Date after Extension
                      </strong>
                      <ul className="list-unstyled my-1">
                        <li>
                          The due date after the extension is applied (if
                          applicable) is: <b>{dueEx}</b>
                        </li>
                      </ul>
                      <br></br>
                      <strong className="d-block text-gray-dark">
                        Due Date after Extension and Token
                      </strong>
                      <ul className="list-unstyled my-1">
                        <li>
                          Each Token extends the deadline by {tokenLen} minutes.{" "}
                          <br></br>The due date after the extension (if
                          applicable) and after all the tokens have been applied
                          is <b>{dueExTo}</b>.
                        </li>
                      </ul>
                      <br></br>
                      <strong className="d-block text-gray-dark">Tokens</strong>
                      <ul className="list-unstyled my-1">
                        <li>
                          You have max <b>{maxToken} tokens</b> and if you
                          submit now, this submission will use{" "}
                          <b>{tokenUsed} tokens</b>.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex text-muted pt-3">
                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                      <strong className="d-block text-gray-dark">
                        Latest Commit
                      </strong>
                      <br></br>
                      {commit && (
                        <ul className="list-unstyled my-1">
                          <li>
                            Your latest commit id is:<b>{commit}</b>
                          </li>

                          <li>
                            The latest commit was made at <b>{commitTime} </b>
                          </li>

                          <li>
                            The latest commit message was <b>"{commitMsg}"</b>
                          </li>
                        </ul>
                      )}
                      {!commit && (
                        <ul className="list-unstyled my-1">
                          <li>There are no commits to show</li>{" "}
                        </ul>
                      )}
                    </p>
                  </div>
                  <div className="d-flex text-muted pt-3">
                    <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                      <strong className="d-block text-gray-dark">
                        Repository URL
                      </strong>
                      <ul className="list-unstyled my-1">
                        <li>
                          HTTPS:{" "}
                          <a href={git}>
                            {!git &&
                              "Please join a group to get a repository link"}
                            {git && git}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex text-muted pt-3">
                    <p className="pb-3 mb-0 small lh-sm border-bottom w-100">
                      <strong className="d-block text-gray-dark">
                        After Due Date
                      </strong>
                      {!collectCommit &&
                        "The final due date has not yet passed"}
                      {collectCommit && (
                        <ul className="list-unstyled my-1">
                          <li>
                            The last collected commit was :{" "}
                            <b>{collectCommit}</b> and <b>{collectTokenUsed}</b>{" "}
                            tokens have been used
                          </li>
                        </ul>
                      )}
                    </p>
                  </div>
                  <small className="d-block text-end mt-3">
                    <a href="#">Assignment Page</a>
                  </small>
                </div>
              </div>

              <div className="col-5 my-2">
                <div className="p-3 bg-body rounded shadow-sm">
                  <h5 className="border-bottom pb-2 mb-0">Group Members</h5>

                  {ismembers &&
                    members.map((e) => (
                      <div className="d-flex text-muted pt-3">
                        <svg
                          className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                          width="32"
                          height="32"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Placeholder: 32x32"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                        >
                          <title>Placeholder</title>
                          <rect
                            width="100%"
                            height="100%"
                            fill="#007bff"
                          ></rect>
                          <text x="50%" y="50%" fill="#007bff" dy=".3em">
                            32x32
                          </text>
                        </svg>

                        <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                          <div className="d-flex justify-content-between">
                            <strong className="text-gray-dark">
                              {e.username}
                            </strong>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="justify-content-start">
                              {e.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                  {!ismembers && "Create or join a group to add group members"}
                  <div className="mt-4">{comp}</div>
                  <div className="mb-2">
                    <a className="small mb-3 left bottom">{group_id}</a>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            <div className="divider2"></div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;

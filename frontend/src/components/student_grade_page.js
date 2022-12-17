import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Form from "react-validation/build/form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/prism.css';
import Prism from "prismjs";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

import AuthService from "../services/auth_services";

let code = String.raw`def __init__(self, weight, time):
self.weight = weight
self.time = time
self.fraction = time / weight
def sort(lst):
# sort when the fraction are equal by the largest weight go first
lst.sort(key=lambda task: task.weight, reverse=True)
lst.sort(key=lambda task: task.fraction)
def sort_weight(lst):
# the wrong greedy algorithm by sorting the list only be weight
lst.sort(key=lambda task: task.weight, reverse=True)
def printask(lst):
final = []
for item in lst:
    final.append([item.weight, item.time, item.fraction])
return final
# this function add all the weight times completion together
def processor_scheduling(lst):
curr_time = 0
total = 0
for task in lst:
    weight = task.weight
    time = task.time
    curr_time = time + curr_time
    total += curr_time * weight
return total
if __name__ == '__main__':
a = task(10, 5)
b = task(20, 10)
c = task(40, 20)
d = task(15, 3)
e = task(30, 6)
f = task(60, 12)
z = [a, b, c, d, e, f]
z_copy = [a, b, c, d, e, f]
sort(z)
sort_weight(z_copy)
print(printask(z))
print('sorting by fraction: ' + str(processor_scheduling(z)))
print(printask(z_copy))
print('sorting by weight: ' + str(processor_scheduling(z_copy)))`;



let Grades = () => {
    let navigate = useNavigate();

    // get username from localstorage
    let username = localStorage.getItem("username");
    
    // get all the json from localstorage
    let fetch = JSON.parse(localStorage.getItem("grades")); 
    let marks = fetch.marks[username];
    console.log(marks);

    // use effect on prism
    useEffect(() => {
      Prism.highlightAll();
    }, []);


    // draw the char js

    // put value into list
    let label = [];
    let score = [];
    let average = [];

    Object.keys(marks).map((e) => (label.push(e)));
    Object.keys(marks).map((e) => (score.push(marks[e].mark)));
    Object.keys(marks).map((e) => (average.push(marks[e].out_of)));

    console.log(score);

    let data = {
      labels: label,
      datasets: [
        {
          label: "marks",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
          borderRadius: 3,
          data: score,
        },{
          label: 'average',
          data: average,
          backgroundColor: "rgba(187,204,227,0.2)",
          borderColor: "rgb(109,144,196)",
          borderWidth: 1,
          borderRadius: 3,
      }],
    };
  
      return (
        <>
            <div>

              <nav id="navbar">
                  <div id="inner">

                      <a href="#">    
                          <Link className="logo2" to="/frontPage">IBS</Link>
                      </a>

                      <div className="d-flex justify-content-end">
                          <Link className="button mx-5" to="/frontPage"> {username} </Link>
                          <Link className="button" to="/Login"> Logout </Link>
                      </div>

                  </div>
              </nav>

              <div className="divider"> </div>

              <div className="card-box row">
                <div className= "col-12 tasks2">
                  <ol className="list-group list-group-numbered">
                    <li className="d-flex justify-content-between flex-row mb-1">
                      <div className="ms-2 me-auto">
                          <div className="fw-bold">Criteria</div>
                      </div>
                      <span className="fw-bold">Grades</span>
                     </li>
                  {Object.keys(marks).map((e) => (
                      <li className="list-group-item d-flex justify-content-between flex-row" key={e}>
                      <div className="ms-2 me-auto">
                          <div className="fw">{e}</div>
                      </div>
                      <span className="badge bg-success rounded-pill mt-1">{marks[e].mark}/{marks[e].out_of}</span>
                      {}
                      </li>
                  ))} 
                  </ol>
                </div>
                
                {/* <div className="col-7 tasks2">
                <pre><code className="language-python">
                    {code}
                </code></pre>
                </div> */}
              </div>

              <div className="divider2"></div>

                <div className="card-box">
                    <div className="fw">A1 grades</div>
                    <div className="chartBox">
                      <Bar data={data} />
                    </div>
                </div>

                <div className="divider2"></div>
                

            </div>
        </>

      );
};

  
export default Grades;
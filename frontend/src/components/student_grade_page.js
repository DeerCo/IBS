import React, { useState, useRef } from "react";
import { useNavigate, Link, useLocation} from 'react-router-dom';
import Form from "react-validation/build/form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';
import '../styles/prism.css';
import Prism from "prismjs";
import { useEffect } from "react";

import AuthService from "../services/auth_services";

const code = String.raw`def __init__(self, weight, time):
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

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

const Grade = () => {

    useEffect(() => {
        Prism.highlightAll();
      }, []);

      return (
        <>
        <div>

            <nav id="navbar">
            <div id="inner">

                <a href="#">
                    <p className="logo2">IBS</p>
                </a>

                <Link className="button" to="/Login"> Logout </Link>

            </div>
            </nav>
            <div className="divider"> </div>

            <div className="card-box row">
                <div className= "col-5 tasks2">
                    <ol className="list-group list-group-numbered">
                        <li className="d-flex justify-content-between flex-row mb-1">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Filename</div>
                            </div>
                            <span className="fw-bold">Grades</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between flex-row">
                            <div className="ms-2 me-auto">
                                <div className="fw">test1</div>
                            </div>
                            <span className="badge bg-success rounded-pill">10/10</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between flex-row" id="highlight">
                            <div className="ms-2 me-auto">
                                <div className="fw">test2</div>
                            </div>
                            <span className="badge bg-success rounded-pill">5/10</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between flex-row">
                            <div className="ms-2 me-auto">
                                <div className="fw">test3</div>
                            </div>
                            <span className="badge bg-success rounded-pill">3/10</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between flex-row">
                            <div className="ms-2 me-auto">
                                <div className="fw">test4</div>
                            </div>
                            <span className="badge bg-success rounded-pill">8/10</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between flex-row">
                            <div className="ms-2 me-auto">
                                <div className="fw">test5</div>
                            </div>
                            <span className="badge bg-success rounded-pill">9/10</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between flex-row">
                            <div className="ms-2 me-auto">
                                <div className="fw">test6</div>
                            </div>
                            <span className="badge bg-success rounded-pill">6/10</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between flex-row">
                            <div className="ms-2 me-auto">
                                <div className="fw">test7</div>
                            </div>
                            <span className="badge bg-success rounded-pill">2/10</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between flex-row">
                            <div className="ms-2 me-auto">
                                <div className="fw">test8</div>
                            </div>
                            <span className="badge bg-success rounded-pill">10/10</span>
                        </li>
                    </ol>
                </div>

                <div className="col-7 tasks2">
                <pre><code className="language-python">
                    {code}
                </code></pre>
                </div>
            </div>

        </div>
        </>

      );
};

  
export default Grade;
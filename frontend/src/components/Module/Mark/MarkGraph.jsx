import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

let MarkGraph = (props) => {
	let marks = props.marks;

	let label = [];
	let score = [];
	let average = [];

	Object.keys(marks).map((e) => (label.push(e)));
	Object.keys(marks).map((e) => (score.push(marks[e].mark)));
	Object.keys(marks).map((e) => (average.push(marks[e].out_of)));

	let data = {
		labels: label,
		datasets: [
			{
				label: "Mark",
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				borderWidth: 1,
				borderRadius: 3,
				data: score,
			}, {
				label: 'Outof',
				data: average,
				backgroundColor: "rgba(187,204,227,0.2)",
				borderColor: "rgb(109,144,196)",
				borderWidth: 1,
				borderRadius: 3,
			}
		],
	};

	return (
		<div>
			<div className="card-box">
				<div className="fw">A1 grades</div>
				<div className="chartBox">
					<Bar data={data} />
				</div>
			</div>

			<div className="divider2"></div>
		</div>
	);
};


export default MarkGraph;
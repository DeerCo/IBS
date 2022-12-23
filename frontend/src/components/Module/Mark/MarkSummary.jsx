import React from "react";

let MarkSummary = (props) => {
	let marks = props.marks;

	return (
		<div>
			<div className="card-box row">
				<div className="col-12 tasks2">
					<ul className="list-group">

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
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="divider2"></div>
		</div>
	);
};


export default MarkSummary;
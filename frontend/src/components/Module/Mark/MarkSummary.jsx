import React from "react";

let MarkSummary = (props) => {
	let marks = props.marks;
	let total_mark = 0;
	let total_out_of = 0;

	for (let mark in marks){
		total_mark += marks[mark].mark;
		total_out_of += marks[mark].out_of;
	}

	if (Object.keys(marks).length > 0) {
		return (
			<div>
				<div className="card-box row">
					<div className="col-12 tasks2">
						<ul className="list-group">

							<li className="d-flex justify-content-between flex-row mb-1">
								<div className="ms-2 me-auto">
									<div className="fw-bold">Criteria</div>
								</div>
								<span className="fw-bold">Your Mark</span>
							</li>

							{Object.keys(marks).map((mark) => (
								<li className="list-group-item d-flex justify-content-between flex-row" key={mark}>
									<div className="ms-2 me-auto">
										<div className="fw">{mark}</div>
									</div>
									<span className="badge bg-success rounded-pill mt-1">{marks[mark].mark}/{marks[mark].out_of}</span>
								</li>
							))}

							<hr />


							<li className="list-group-item d-flex justify-content-between flex-row" key={"total"}>
								<div className="ms-2 me-auto">
									<div className="fw">Total</div>
								</div>
								<span className="badge bg-success rounded-pill mt-1">{total_mark}/{total_out_of}</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="divider2"></div>
			</div>
		);
	} else{
		return (
			<div>
				<h1>No mark is available</h1>
			</div>		
		);
	}
};


export default MarkSummary;
import React from "react";
import { FaCheckCircle, FaEllipsisV, FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams, Link } from "react-router-dom";
import { assignments } from "../../../Database";

function AssignmentEditor() {
    const { assignmentId } = useParams();
    const assignment = assignments.find(
        (assignment) => assignment._id === assignmentId);
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleSave = () => {
        console.log("Actually saving assignment TBD in later assignments");
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };
    return (
        <div className="container-fluid">
            <div style={{ textAlign: "right", color: "green" }}>
                <FaCheckCircle className="text-success" /> Published
                <button type="button" className="btn btn-light ms-2" >
                    <FaEllipsisV />
                </button>
            </div>
            <hr />

            <div>
                <h6>Assignment Name</h6>
                <input value={assignment?.title}
                    className="form-control mb-2" />

                <div className="mb-3">
                    <textarea className="form-control" id="textarea1" rows={3}>
                        This is the assignment description.</textarea>
                </div>
                <br />

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label>Points</label>
                    </div>
                    <div className="col-sm-10" style={{ width: "60%" }}>
                        <input type="text" className="form-control" id="points" value="100" />
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label htmlFor="select-one-genre" className="col-form-label">Assignment Group</label>
                    </div>
                    <div className="col-sm-10" style={{ width: "60%" }}>
                        <select className="form-select">
                            <option selected>ASSIGNMENTS</option>
                            <option value="QUIZ">QUIZ</option>
                            <option value="EXAM">EXAM</option>
                            <option value="PROJECT">PROJECT</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label htmlFor="select-one-genre" className="col-form-label">Display Grade as</label>
                    </div>
                    <div className="col-sm-10" style={{ width: "60%" }}>
                        <select className="form-select">
                            <option selected>Percentage</option>
                        </select>
                        <br className="d-sm-none" />
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="0" />
                            <label className="form-check-label" htmlFor="0">Do not count this assignment towards the final grade</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label htmlFor="select-one-genre" className="col-form-label">Submision Type</label>
                    </div>
                    <div className="col-sm-10" style={{ width: "60%" }}>
                        <select className="form-select">
                            <option selected>Online</option>
                        </select>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label className="col-form-label">Online Entry Options</label>
                    </div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="r1" />
                            <label className="form-check-label" htmlFor="r1">Text Entry</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="r2" />
                            <label className="form-check-label" htmlFor="r2">Website URL</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="r3" />
                            <label className="form-check-label" htmlFor="r3">Media</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="r4" />
                            <label className="form-check-label" htmlFor="r4">Student</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="r5" />
                            <label className="form-check-label" htmlFor="r5">File Uploads</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label className="col-form-label">Group Assignments</label>
                    </div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="1" />
                            <label className="form-check-label" htmlFor="1">Assignment</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label className="col-form-label">Peer Review</label>
                    </div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="2" />
                            <label className="form-check-label" htmlFor="2">Review</label>
                        </div>
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label htmlFor="text-fields-assign" className="col-form-label">Assign</label><br />
                    </div>
                    <div className="col-sm-10" style={{ width: "60%" }}>
                        <div className="card">
                            <div className="card-body">
                                <strong>Assign to</strong><br />
                                <input className="form-control" id="text-fields" value="Everyone" />
                                <br />

                                <strong>Due</strong>
                                <div className="input-group mb-3">
                                    <input type="date" className="form-control" id="input-due" value="2021-01-01" />
                                    <span className="input-group-text"><FaRegCalendarAlt /></span>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <strong>Available from</strong>
                                        <div className="input-group mb-3">
                                            <input type="date" className="form-control" id="input-available-from" value="2021-01-01" />
                                            <span className="input-group-text"><FaRegCalendarAlt /></span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>Until</strong>
                                        <div className="input-group mb-3">
                                            <input type="date" className="form-control" id="input-until" value="2021-01-01" />
                                            <span className="input-group-text"><FaRegCalendarAlt /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group-text" style={{ justifyContent: "center" }}>
                                + Add
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="footer" />
                        <label className="form-check-label" htmlFor="footer">Notify users that this content has changed</label>
                    </div>

                    <div className="float-end">
                        <button onClick={handleSave} className="btn btn-danger">
                            Save
                        </button>
                        <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                            className="btn btn-light ms-2">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AssignmentEditor;
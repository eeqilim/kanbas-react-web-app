import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaCheckCircle, FaEllipsisV, FaRegCalendarAlt } from "react-icons/fa";
import { KanbasState } from "../../../store";
import { addAssignment, updateAssignment, setAssignment } from "../assignmentsReducer";
import * as client from "../client";

function AssignmentEditor() {
    const { courseId, assignmentId } = useParams();
    const handleAddAssignment = () => {
        client.createAssignment(courseId, assignment).then((assignment) => {
            dispatch(addAssignment(assignment));
        });
    };
    const handleUpdateAssignment = async () => {
        const status = await client.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };
    const assignmentList = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignments);
    const assignment = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignment);
    const dispatch = useDispatch();
    const isNewAssignment = !assignmentList.find(assignment => assignment._id === assignmentId);
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
                    className="form-control mb-2"
                    onChange={(e) =>
                        dispatch(setAssignment({ ...assignment, title: e.target.value }))} />

                <div className="mb-3">
                    <textarea className="form-control" id="textarea1" rows={3}
                        onChange={(e) =>
                            dispatch(setAssignment({ ...assignment, description: e.target.value }))}>
                        This is the assignment description.</textarea>
                </div>
                <br />

                <div className="mb-3 row">
                    <div className="col-sm-2 text-sm-end mb-2 mb-sm-0">
                        <label>Points</label>
                    </div>
                    <div className="col-sm-10" style={{ width: "60%" }}>
                        <input type="text" className="form-control" id="points" value={assignment.point}
                            onChange={(e) =>
                                dispatch(setAssignment({ ...assignment, point: e.target.value }))} />
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
                                    <input type="datetime-local" className="form-control" id="input-due" value={assignment.due}
                                        onChange={(e) =>
                                            dispatch(setAssignment({ ...assignment, due: e.target.value }))} />
                                    <span className="input-group-text"><FaRegCalendarAlt /></span>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <strong>Available from</strong>
                                        <div className="input-group mb-3">
                                            <input type="datetime-local" className="form-control" id="input-available-from" value={assignment.availableFrom}
                                                onChange={(e) =>
                                                    dispatch(setAssignment({ ...assignment, availableFrom: e.target.value }))} />
                                            <span className="input-group-text"><FaRegCalendarAlt /></span>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <strong>Until</strong>
                                        <div className="input-group mb-3">
                                            <input type="datetime-local" className="form-control" id="input-until" value={assignment.availableUntil}
                                                onChange={(e) =>
                                                    dispatch(setAssignment({ ...assignment, availableUntil: e.target.value }))} />
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
                        <Link to={`/Kanbas/Courses/${courseId}/Assignments`} className="btn btn-danger"
                            onClick={isNewAssignment
                                ? handleAddAssignment
                                : handleUpdateAssignment}>
                            Save
                        </Link>
                        <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                            className="btn btn-light ms-2">
                            Cancel
                        </Link>
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AssignmentEditor;
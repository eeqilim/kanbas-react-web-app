import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaCaretDown, FaRegEdit } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignment, resetAssignment } from "./assignmentsReducer";
import { KanbasState } from "../../store";

function Assignments() {
    const { courseId } = useParams();
    const assignmentList = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignments.filter(assignment => assignment.course === courseId));
    const dispatch = useDispatch();

    const confirmDelete = (assignmentId: any) => {
        if (window.confirm("Are you sure you want to delete this assignment?")) {
            dispatch(deleteAssignment(assignmentId));
        }
    }

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6">
                    <input type="text" className="form-control w-50" id="text-fields-search-students"
                        placeholder="Search for Assignments" />
                </div>
                <div className="col-sm-6">
                    <span className="float-end">
                        <button type="button" className="btn btn-light">+ Group</button>
                        <Link to={`/Kanbas/Courses/${courseId}/Assignments/${undefined}`} className="btn btn-danger"
                            onClick={() => { dispatch(resetAssignment()); }}>
                            + Assignment
                        </Link>
                        <button type="button" className="btn btn-light">
                            <FaEllipsisV />
                        </button>
                    </span>
                </div>
            </div>
            <hr />

            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <FaEllipsisV className="me-2" /><FaCaretDown /> ASSIGNMENTS
                        <span className="float-end">
                            <button type="button" className="rounded-pill" style={{ backgroundColor: "lightgrey", border: "1px solid black" }}>
                                &nbsp;40% of Total&nbsp;
                            </button>
                            <FaCheckCircle className="text-success ms-2" />
                            <FaPlusCircle className="ms-2" /><FaEllipsisV className="ms-2" />
                        </span>
                    </div>

                    <ul className="list-group">
                        {assignmentList.map((assignment) => (
                            <li className="list-group-item">
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td><FaEllipsisV /></td>
                                            <td><FaRegEdit className="ms-2" /></td>

                                            <td className="w-100">
                                                <div className="row ms-3">
                                                    <div className="col">
                                                        <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}
                                                            onClick={() => {
                                                                dispatch(setAssignment(assignment));
                                                            }}>
                                                            {assignment.title}
                                                        </Link>
                                                        &nbsp;
                                                        <button onClick={() => confirmDelete(assignment._id)}>
                                                            Delete
                                                        </button>
                                                        <br />
                                                        <span style={{ color: "red" }}>Multiple Modules</span> |&nbsp;
                                                        {assignment.availableFrom && new Date(assignment.availableFrom) > new Date() &&
                                                            <span>Not available until {formatDate(assignment.availableFrom)} | </span>}
                                                        Due {formatDate(assignment.due)} | {assignment.point} pts
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="float-end" style={{ display: "flex", alignItems: "center" }}>
                                                    <FaCheckCircle className="text-success" />
                                                    <FaEllipsisV className="ms-2" />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
export default Assignments;
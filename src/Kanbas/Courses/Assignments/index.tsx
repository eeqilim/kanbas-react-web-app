import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaCaretDown, FaRegEdit, FaBlackTie } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";

function Assignments() {
    const { courseId } = useParams();
    const assignmentList = assignments.filter(
        (assignment) => assignment.course === courseId);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6">
                    <input type="text" className="form-control w-25" id="text-fields-search-students"
                        placeholder="Search for Assignments" />
                </div>
                <div className="col-sm-6">
                    <span className="float-end">
                        <button type="button" className="btn btn-light">+ Group</button>
                        <button type="button" className="btn btn-danger">+ Assignment</button>
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
                            <li className="list-group-item" key={assignment._id}>
                                <table className="w-100">
                                    <tbody>
                                        <tr>
                                            <td><FaEllipsisV /></td>
                                            <td><FaRegEdit className="ms-2" /></td>

                                            <td className="w-100">
                                                <div className="row ms-3">
                                                    <div className="col">
                                                        <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`}>
                                                            {assignment.title}
                                                        </Link>
                                                        <br />
                                                        <span style={{ color: "red" }}>Multiple Modules</span> | {assignment.description}
                                                        {assignment.description && <br />}
                                                        {assignment.due}
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
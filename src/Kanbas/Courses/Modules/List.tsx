import React, { useState } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaRegCheckCircle, FaCaretRight, FaCaretDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
} from "./modulesReducer";
import { KanbasState } from "../../store";

function ModuleList() {
    const { courseId } = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules);
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();
    return (
        <>
            <div style={{ textAlign: "right" }}>
                <button type="button" className="btn btn-light ms-2">Collapse All</button>
                <button type="button" className="btn btn-light ms-2">View Progress</button>
                <button type="button" className="btn btn-light ms-2"><FaRegCheckCircle className="text-success" /> Publish All <FaCaretDown /></button>
                <button className="btn btn-danger ms-2">+ Module</button>
                <button type="button" className="btn btn-light ms-2">
                    <FaEllipsisV />
                </button>
            </div>
            <hr />

            <ul className="list-group wd-modules">
                <li className="list-group-item">
                    <div>
                        <button onClick={() => dispatch(addModule({ ...module, course: courseId }))}>
                            Add
                        </button>
                        <button style={{ marginLeft: "5px" }} onClick={() => dispatch(updateModule(module))}>
                            Update
                        </button>
                        <br />
                        <input
                            value={module.name} style={{ marginBottom: "8px", width: "100%" }}
                            onChange={(e) => dispatch(setModule({ ...module, name: e.target.value }))} />
                        <br />
                        <textarea
                            value={module.description} style={{ width: "100%" }}
                            onChange={(e) =>
                                dispatch(setModule({ ...module, description: e.target.value }))} />
                    </div>
                </li>
                {moduleList
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index} className="list-group-item">
                            <div>
                                <button onClick={() => dispatch(setModule(module))}>
                                    Edit
                                </button>
                                <button style={{ marginLeft: "5px" }} onClick={() => dispatch(deleteModule(module._id))}>
                                    Delete
                                </button>
                                <br />
                                <FaEllipsisV />
                                <FaCaretRight />
                                {module.name}
                                <span className="float-end">
                                    <FaCheckCircle className="text-success" />
                                    <FaCaretDown />
                                    <FaPlusCircle className="ms-2" />
                                    <FaEllipsisV className="ms-2" />
                                </span>
                                <br />
                                {module.description}
                            </div>
                            <ul className="list-group">
                                {module.lessons?.map((lesson: { _id: string; name: string; module: string }) => (
                                    <li className="list-group-item">
                                        <FaEllipsisV className="me-2" />
                                        {lesson.name}
                                        <span className="float-end">
                                            <FaCheckCircle className="text-success" />
                                            <FaEllipsisV className="ms-2" />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>
        </>
    );
}
export default ModuleList;
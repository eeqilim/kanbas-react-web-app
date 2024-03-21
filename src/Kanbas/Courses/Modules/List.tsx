import React, { useState, useEffect } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaRegCheckCircle, FaCaretRight, FaCaretDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./modulesReducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function ModuleList() {
    const { courseId } = useParams();
    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };
    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };
    const handleAddModule = () => {
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };
    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);
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
                        <button onClick={handleAddModule}>
                            Add
                        </button>
                        <button style={{ marginLeft: "5px" }} onClick={handleUpdateModule}>
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
                                <button style={{ marginLeft: "5px" }} onClick={() => handleDeleteModule(module._id)} >
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
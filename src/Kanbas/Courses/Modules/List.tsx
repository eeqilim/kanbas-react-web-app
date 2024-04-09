import React, { useState, useEffect } from "react";
import "./index.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle, FaRegCheckCircle, FaCaretRight, FaCaretDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as client from "./client";
import { Module } from "./client";

function ModuleList() {
    const { courseId } = useParams();
    const [modules, setModules] = useState<Module[]>([]);
    const [module, setModule] = useState<Module>({
        _id: "0", name: "New Module", description: "New Description",
        course: courseId as string, lessons: [
            { _id: "", name: "", module: "" }
        ]
    });
    const createModule = async () => {
        try {
            const newModule = await client.createModule(module);
            setModules([newModule, ...modules]);
        } catch (err) {
            console.log(err);
        }
    };
    const fetchModules = async () => {
        const modules = await client.findAllModules(courseId);
        setModules(modules);
    };
    const updateModule = async () => {
        try {
            const status = await client.updateModule(module);
            setModules(modules.map((u) =>
                (u._id === module._id ? module : u)));
        } catch (err) {
            console.log(err);
        }
    };
    const deleteModule = async (module: Module) => {
        try {
            await client.deleteModule(module);
            setModules(modules.filter((u) => u._id !== module._id));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        fetchModules();
    }, [courseId]);
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
                        <button onClick={createModule}>
                            Add
                        </button>
                        <button style={{ marginLeft: "5px" }} onClick={updateModule}>
                            Update
                        </button>
                        <br />
                        <input
                            value={module.name} style={{ marginBottom: "8px", width: "100%" }}
                            onChange={(e) => setModule({ ...module, name: e.target.value })} />
                        <br />
                        <textarea
                            value={module.description} style={{ width: "100%" }}
                            onChange={(e) =>
                                setModule({ ...module, description: e.target.value })} />
                    </div>
                </li>
                {modules
                    .filter((module) => module.course === courseId)
                    .map((module, index) => (
                        <li key={index} className="list-group-item">
                            <div>
                                <button onClick={() => setModule(module)}>
                                    Edit
                                </button>
                                <button style={{ marginLeft: "5px" }} onClick={() => deleteModule(module)} >
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
                                {module.lessons?.map((lesson) => (
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
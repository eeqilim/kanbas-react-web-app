import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }
        : {
            courses: any;
            course: any;
            setCourse: React.Dispatch<React.SetStateAction<any>>;
            addNewCourse: () => void;
            deleteCourse: (courseId: string) => void;
            updateCourse: () => void;
        }) {
    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <h5>Course</h5>
            <input value={course.name} className="form-control" style={{ marginBottom: "2px" }}
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <input value={course.number} className="form-control" style={{ marginBottom: "2px" }}
                onChange={(e) => setCourse({ ...course, number: e.target.value })} />
            <input value={course.startDate} className="form-control" type="date" style={{ marginBottom: "2px" }}
                onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
            <input value={course.endDate} className="form-control" type="date" style={{ marginBottom: "5px" }}
                onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
            <button onClick={addNewCourse} >
                Add
            </button>
            <button style={{ marginLeft: "3px" }} onClick={updateCourse} >
                Update
            </button>
            <hr />
            <h2>Published Courses (12)</h2> <hr />
            <div className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course: any) => (
                        <div key={course._id} className="col" style={{ width: 300 }}>
                            <div className="card">
                                <img src={`/images/${course.image}`} className="card-img-top"
                                    style={{ height: 150 }} />
                                <div className="card-body">
                                    <Link key={course._id}
                                        to={`/Kanbas/Courses/${course._id}`}
                                        className="list-group-item" style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            setCourse(course);
                                        }}>
                                            Edit
                                        </button>
                                        <button style={{ marginLeft: "3px" }} onClick={(event) => {
                                            event.preventDefault();
                                            deleteCourse(course._id);
                                        }}>
                                            Delete
                                        </button>
                                        <br />
                                        {course.name}
                                    </Link>
                                    <p className="card-text" style={{ fontSize: "11px" }}>{course.description}</p>
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">
                                        Go
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
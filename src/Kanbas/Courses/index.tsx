import React, { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useParams, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { KanbasState } from "../store";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import Dashboard from "../Dashboard";
import db from "../../Kanbas/Database";
import {
    FaChevronDown, FaTachometerAlt, FaRegUserCircle, FaBook, FaRegCalendarAlt,
    FaInbox, FaRegClock, FaDesktop, FaExternalLinkAlt, FaRegQuestionCircle, FaTimes,
    FaChevronRight, FaHome, FaRegEdit, FaRegFileAlt, FaRegCircle, FaEyeSlash
} from "react-icons/fa";
import { TiFlowMerge, TiCogOutline } from "react-icons/ti";
import { BsPlug } from "react-icons/bs";
import { VscNotebook, VscRocket } from "react-icons/vsc";
import { SlPeople } from "react-icons/sl";
import { GoCommentDiscussion } from "react-icons/go";
import { LiaBullhornSolid, LiaBookSolid } from "react-icons/lia";
import { FaRegFolderClosed } from "react-icons/fa6";
import { PiTarget } from "react-icons/pi";
import { HiMiniBars3 } from "react-icons/hi2";
import { GrInspect } from "react-icons/gr";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {
    const { courseId } = useParams();
    const COURSES_API = `${API_BASE}/api/courses`;
    const [course, setCourse] = useState<any>({ _id: "" });
    const [courses, setCourses] = useState<any[]>([]);
    const findCourseById = async (courseId?: string) => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}`
        );
        setCourse(response.data);
    };
    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);
    const currentLocation = useLocation().pathname.split("/").pop();
    const assignment = useSelector((state: KanbasState) =>
        state.assignmentsReducer.assignment._id === currentLocation ? state.assignmentsReducer.assignment : null);
    const [coursesState, setCoursesState] = useState(db.courses);
    const [courseState, setCourseState] = useState({
        _id: "0", name: "New Course", "section": "CS4550.12631.202410",
        "description": "202410_1 Fall 2023 Semester Full Term", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "reactjs.jpg"
    });
    const addNewCourse = async () => {
        const response = await axios.post(COURSES_API, course);
        setCourses([...courses, response.data]);
    };
    const deleteCourse = async (courseId: string) => {
        const response = await axios.delete(
            `${COURSES_API}/${courseId}`
        );
        setCourses(courses.filter((course) => course._id !== courseId));
    };
    const updateCourse = async () => {
        const response = await axios.put(
            `${COURSES_API}/${course._id}`,
            course
        );
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                }
                return c;
            })
        );
    };
    const routes = [
        { path: "/", element: <Navigate to="Home" /> },
        { path: "Home", element: <Home />, icon: <FaHome className="wd-kanbas-navigation-icon" />, label: "Home" },
        { path: "Modules", element: <Modules />, icon: <TiFlowMerge className="wd-kanbas-navigation-icon" />, label: "Modules" },
        { path: "Piazza", element: <h1>Piazza</h1>, icon: <BsPlug className="wd-kanbas-navigation-icon" />, label: "Piazza" },
        { path: "Zoom", element: <h1>Zoom Meetings</h1>, icon: <BsPlug className="wd-kanbas-navigation-icon" />, label: "Zoom Meetings" },
        { path: "Assignments", element: <Assignments />, icon: <FaRegEdit className="wd-kanbas-navigation-icon" />, label: "Assignments" },
        { path: "Assignments/:assignmentId", element: <AssignmentEditor /> },
        { path: "Grades", element: <Grades />, icon: <VscNotebook className="wd-kanbas-navigation-icon" />, label: "Grades" },
        { path: "Quizzes", element: <h1>Quizzes</h1>, icon: <VscRocket className="wd-kanbas-navigation-icon" />, label: "Quizzes" },
        { path: "People", element: <h1>People</h1>, icon: <SlPeople className="wd-kanbas-navigation-icon" />, label: "People" },
        { path: "Panopto", element: <h1>Panopto Video</h1>, icon: <BsPlug className="wd-kanbas-navigation-icon" />, label: "Panopto" },
        { path: "Discussions", element: <h1>Discussions</h1>, icon: <GoCommentDiscussion className="wd-kanbas-navigation-icon" />, icon2: <FaEyeSlash style={{ color: "grey" }} />, label: "Discussions" },
        { path: "Announcements", element: <h1>Announcements</h1>, icon: <LiaBullhornSolid className="wd-kanbas-navigation-icon" />, icon2: <FaEyeSlash style={{ color: "grey" }} />, label: "Announcements" },
        { path: "Pages", element: <h1>Pages</h1>, icon: <FaRegFileAlt className="wd-kanbas-navigation-icon" />, icon2: <FaEyeSlash style={{ color: "grey" }} />, label: "Pages" },
        { path: "Files", element: <h1>Files</h1>, icon: <FaRegFolderClosed className="wd-kanbas-navigation-icon" />, icon2: <FaEyeSlash style={{ color: "grey" }} />, label: "Files" },
        { path: "Rubrics", element: <h1>Rubrics</h1>, icon: <FaRegFileAlt className="wd-kanbas-navigation-icon" />, icon2: <FaEyeSlash style={{ color: "grey" }} />, label: "Rubrics" },
        { path: "Outcomes", element: <h1>Outcomes</h1>, icon: <PiTarget className="wd-kanbas-navigation-icon" />, icon2: <FaEyeSlash style={{ color: "grey" }} />, label: "Outcomes" },
        { path: "Collaborations", element: <h1>Collaborations</h1>, icon: <FaRegCircle className="wd-kanbas-navigation-icon" />, icon2: <FaEyeSlash style={{ color: "grey" }} />, label: "Collaborations" },
        { path: "Syllabus", element: <h1>Syllabus</h1>, icon: <LiaBookSolid className="wd-kanbas-navigation-icon" />, icon2: <FaEyeSlash style={{ color: "grey" }} />, label: "Syllabus" },
        { path: "Progress", element: <h1>Progress Reports (EAB Navigate)</h1>, icon: <BsPlug className="wd-kanbas-navigation-icon" />, label: "Progress Reports (EAB Navigate)" },
        { path: "Settings", element: <h1>Settings</h1>, icon: <TiCogOutline className="wd-kanbas-navigation-icon" />, label: "Settings" },
    ];
    const dashboardItems = [
        {
            path: "../Dashboard", element: <Dashboard
                courses={coursesState}
                course={courseState}
                setCourse={setCourseState}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse} />,
            label: "Dashboard", icon: <FaTachometerAlt className="fs-2 wd-kanbas-navigation-icon" />
        },
        { path: "../Account", element: <h1>Account</h1>, label: "Account", icon: <FaRegUserCircle className="fs-2" style={{ color: "grey" }} />, icon2: <FaChevronRight style={{ color: "lightgrey", float: "right" }} /> },
        { path: "Home", element: <Courses />, label: "Courses", icon: <FaBook className="fs-2 wd-kanbas-navigation-icon" />, icon2: <FaChevronRight style={{ color: "lightgrey", float: "right" }} /> },
        { path: "../Calendar", element: <h1>Calendar</h1>, label: "Calendar", icon: <FaRegCalendarAlt className="fs-2 wd-kanbas-navigation-icon" /> },
        { path: "../Inbox", element: <h1>Inbox</h1>, label: "Inbox", icon: <FaInbox className="fs-2 wd-kanbas-navigation-icon" />, breakAfter: true },
        { path: "../Studio", element: <h1>Studio</h1>, label: "Studio", icon: <FaDesktop className="fs-2 wd-kanbas-navigation-icon" /> },
        { path: "../Commons", element: <h1>Commons</h1>, label: "Commons", icon: <FaExternalLinkAlt className="fs-2 wd-kanbas-navigation-icon" /> },
        { path: "../History", element: <h1>History</h1>, label: "History", icon: <FaRegClock className="fs-2 wd-kanbas-navigation-icon" />, icon2: <FaChevronRight style={{ color: "lightgrey", float: "right" }} /> },
        { path: "../Help", element: <h1>Help</h1>, label: "Help", icon: <FaRegQuestionCircle className="fs-2 wd-kanbas-navigation-icon" />, icon2: <FaChevronRight style={{ color: "lightgrey", float: "right" }} />, breakAfter: true },
    ];
    const [isModulesOpen, setIsModulesOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleModulesCollapse = () => {
        setIsModulesOpen(!isModulesOpen);
    };
    const toggleDropdownCollapse = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div>
            <div className="d-none d-md-block" style={{ marginTop: "20px", marginLeft: "25px" }}>
                <ol className="breadcrumb">
                    <span style={{ color: "red" }}><HiMiniBars3 /> &nbsp;{course?.name}</span>

                    {(assignment) ?
                        (<li className="breadcrumb-item active" aria-current="page">
                            &nbsp; {'>'} &nbsp; {"Assignments"} &nbsp; {'>'} &nbsp; {assignment?.title}
                        </li>) :
                        (<li className="breadcrumb-item active" aria-current="page">
                            &nbsp; {'>'} &nbsp; {currentLocation}
                        </li>)}

                    {(currentLocation == "Modules" || currentLocation == "Home") &&
                        (<div className="col">
                            <button type="button" className="float-end btn btn-light" style={{ marginRight: "15px" }}>
                                <GrInspect style={{ color: "grey" }} /> Student View
                            </button>
                        </div>)}
                </ol>
                <hr />
            </div>

            <div className="d-md-none">
                {!isModulesOpen && (
                    <table className="w-100" style={{ color: "white" }}>
                        <tbody>
                            <tr style={{ backgroundColor: "black" }}>
                                <td>
                                    <HiMiniBars3 style={{ marginLeft: "20px", marginRight: "20px" }} onClick={toggleModulesCollapse} />
                                </td>
                                <td className="text-center">{course?.name}<br />Modules</td>
                                <td>
                                    <span className="float-end" style={{ marginRight: "20px" }}>
                                        <GrInspect className="me-2" />
                                        {isDropdownOpen ? (
                                            <FaTimes onClick={toggleDropdownCollapse} />
                                        ) : (
                                            <FaChevronDown onClick={toggleDropdownCollapse} />
                                        )}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5}>
                                    {isDropdownOpen && (
                                        <div style={{ border: "1px #ced4da", borderBottom: "1px solid #adb5bd", boxShadow: "0px 9px 20px rgba(0, 0, 0, 0.3)", padding: "10px", marginBottom: "30px" }}>
                                            {routes.map((item, index) => (
                                                <div key={index}>
                                                    {item.path && (
                                                        <Link to={item.path} style={{ color: "red", textDecoration: "none" }} onClick={() => setIsDropdownOpen(false)}>
                                                            {item.icon} {item.label} {item.icon2}
                                                        </Link>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {isModulesOpen && (
                    <div style={{ backgroundColor: "white", color: "red", padding: "20px" }}>
                        <FaTimes style={{ color: "grey", float: "right" }} onClick={toggleModulesCollapse} />
                        <br />
                        {dashboardItems.map((item, index) => (
                            <div key={index} style={{ marginBottom: "10px" }}>
                                {item.path && (
                                    <Link to={item.path} style={{ color: "red", textDecoration: "none" }} onClick={() => setIsModulesOpen(false)}>
                                        {item.icon} {item.label} {item.icon2}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="d-none d-md-block">
                <em style={{ fontSize: "10px", marginLeft: "25px" }}>{course?.description}</em>
                <CourseNavigation />
            </div>

            <div>
                <div className="overflow-y-scroll position-fixed bottom-0 end-0 d-none d-md-block" style={{ left: "320px", top: "90px" }} >
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} {...route} />
                        ))}
                    </Routes>

                </div>
                <div className="flex-fill container-fluid p-3 d-md-none">
                    <Routes>
                        {(!isModulesOpen) && (
                            <>
                                {routes.map((route, index) => (
                                    <Route key={index} {...route} />
                                ))}
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </div>
    );
}
export default Courses;
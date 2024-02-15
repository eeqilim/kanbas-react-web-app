import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import { TbFileImport, TbFileExport } from "react-icons/tb";
import { FiFilter } from "react-icons/fi";

function Grades() {
    const { courseId } = useParams();
    const as = assignments.filter((assignment) => assignment.course === courseId);
    const es = enrollments.filter((enrollment) => enrollment.course === courseId);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-6">
                    <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ color: "red" }}>
                        Gradebook
                    </button>
                </div>
                <div className="col-sm-6">
                    <span className="float-end">
                        <button type="button" className="btn btn-light me-1">
                            <TbFileImport /> Import
                        </button>
                        <button className="btn btn-light dropdown-toggle me-1" type="button" id="exportDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <TbFileExport /> Export
                        </button>
                        <button type="button" className="btn btn-light">
                            <FaCog />
                        </button>
                    </span>
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col-md-6">
                    <strong>Student Names</strong>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search Students" />
                    </div>
                </div>

                <div className="col-md-6">
                    <strong>Assignment Names</strong>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Search Assignments" />
                    </div>
                </div>
            </div>

            <button type="button" className="btn btn-light mb-3">
                <FiFilter /> Apply Filters
            </button>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th className="align-middle">Student Name</th>
                            {as.map((assignment) => (<th key={assignment._id} className="text-center align-middle">{assignment.title}<br />Out of 100</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {es.map((enrollment) => {
                            const user = users.find((user) => user._id === enrollment.user);
                            return (
                                <tr key={enrollment.user}>
                                    <td>{user?.firstName} {user?.lastName}</td>
                                    {as.map((assignment) => {
                                        const grade = grades.find((grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                                        return (<td key={assignment._id} className="text-center align-middle">{grade?.grade || ""}</td>);
                                    })}
                                </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Grades;
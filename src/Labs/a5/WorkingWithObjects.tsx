import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const ASSIGNMENT_URL = `${API_BASE}/a5/assignment`;
  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios
      .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);
  const [module, setModule] = useState({
    id: 2, name: "NodeJS Module",
    description: "Create a NodeJS server with ExpressJS",
    course: "Web Development",
  });
  const MODULE_URL = `${API_BASE}/a5/module`;
  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary me-2" href={`${API_BASE}/a5/assignment`}>
        Get Assignment
      </a>
      <a className="btn btn-danger me-2" href={`${API_BASE}/a5/module`}>
        Get Module
      </a>
      <h4>Retrieving Properties</h4>
      <a className="btn btn-primary me-2" href={`${API_BASE}/a5/assignment/title`}>
        Get Title
      </a>
      <a className="btn btn-danger me-2" href={`${API_BASE}/a5/module/name`}>
        Get Name
      </a>

      <h3>Modifying Properties</h3>
      <input onChange={(e) => setAssignment({
        ...assignment, title: e.target.value
      })}
        value={assignment.title} type="text" /> &nbsp;
      <button className="btn btn-primary me-2" onClick={updateTitle} >
        Update Title to: {assignment.title}
      </button>
      <button className="btn btn-danger me-2" onClick={fetchAssignment} >
        Fetch Assignment
      </button>

      <h4>Modifying Assignment Properties</h4>
      <a className="btn btn-primary me-2" href={`${ASSIGNMENT_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input type="text"
        onChange={(e) => setAssignment({
          ...assignment,
          title: e.target.value
        })}
        value={assignment.title} />
      <br />
      <br />
      <a className="btn btn-primary me-2" href={`${ASSIGNMENT_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <input type="number"
        onChange={(e) => setAssignment({
          ...assignment,
          score: parseInt(e.target.value)
        })}
        value={assignment.score} />
      <br />
      <br />
      <a className="btn btn-primary me-2" href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}>
        Update Completed
      </a>
      <input type="checkbox"
        onChange={(e) => setAssignment({
          ...assignment,
          completed: e.target.checked
        })}
        checked={assignment.completed} /> Completed &nbsp;
      <input type="checkbox"
        onChange={(e) => setAssignment({
          ...assignment,
          completed: !e.target.checked
        })}
        checked={!assignment.completed} /> Not Completed

      <h4>Modifying Module Properties</h4>
      <a className="btn btn-danger me-2" href={`${MODULE_URL}/name/${module.name}`}>
        Update Name
      </a>
      <input type="text"
        onChange={(e) => setModule({
          ...module,
          name: e.target.value
        })}
        value={module.name} />
      <br />
      <br />
      <a className="btn btn-danger me-2" href={`${MODULE_URL}/description/${module.description}`}>
        Update Description
      </a>
      <input type="text"
        onChange={(e) => setModule({
          ...module,
          description: e.target.value
        })}
        value={module.description} />
    </div>
  );
}
export default WorkingWithObjects;
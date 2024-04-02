import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import Account from "./Account";

const API_BASE = process.env.REACT_APP_API_BASE;

function Kanbas() {
   const [courses, setCourses] = useState<any[]>([]);
   const [course, setCourse] = useState({
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
   const COURSES_API = `${API_BASE}/api/courses`;
   const findAllCourses = async () => {
      const response = await axios.get(COURSES_API);
      setCourses(response.data);
   };
   useEffect(() => {
      findAllCourses();
   }, []);
   return (
      <Provider store={store}>
         <div className="d-flex">
            <div className="d-none d-md-block">
               <div style={{ paddingRight: "90px" }}>
                  <KanbasNavigation />
               </div>
            </div>
            <div style={{ flexGrow: 1 }}>
               <Routes>
                  <Route path="/" element={<Navigate to="Dashboard" />} />
                  <Route path="/Account/*" element={<Account />} />
                  <Route path="Dashboard" element={<Dashboard
                     courses={courses}
                     course={course}
                     setCourse={setCourse}
                     addNewCourse={addNewCourse}
                     deleteCourse={deleteCourse}
                     updateCourse={updateCourse} />
                  } />
                  <Route path="Courses/:courseId/*" element={<Courses />} />
               </Routes>
            </div>
         </div>
      </Provider>
   );
}
export default Kanbas;
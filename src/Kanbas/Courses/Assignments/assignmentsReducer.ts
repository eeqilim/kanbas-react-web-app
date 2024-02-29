import { createSlice } from "@reduxjs/toolkit";
import database from "../../Database";

const { assignments } = database;
const initialState = {
    assignments: assignments,
    assignment: { title: "New Assignment", due: "2024-09-18T23:59", point: "100" },
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                { ...action.payload, _id: new Date().getTime().toString() },
                ...state.assignments,
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },
        resetAssignment: (state) => {
            state.assignment = initialState.assignment;
        },
    },
});
export const { addAssignment, deleteAssignment,
    updateAssignment, setAssignment, resetAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
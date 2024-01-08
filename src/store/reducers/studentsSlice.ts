import { PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";
import Student from "../../interfaces/Student";
import { getAllStudents } from "../../requests/StudentsRequests";
import { Mode } from "../../Enums";

interface StudentState {
  data: Record<string, Student>;
  status: Mode;
}

const initialState: StudentState = {
  data: {},
  status: Mode.LOADING,
};

export const fetchStudents = () => async (dispatch: Dispatch) => {
  try {
    const students = await getAllStudents();
    let studentsMap = Object.fromEntries(
      students.map((student: Student) => [student._id, student])
    );
    dispatch(setStudents(studentsMap));
  } catch (error) {
    dispatch(setError());
    throw error;
  }
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Record<string, Student>>) => {
      state.data = action.payload;
      state.status = Mode.SUCCESS;
    },
    setError: (state, action: PayloadAction) => {
      state.status = Mode.ERROR;
    },
    addStudentToState: (state, action: PayloadAction<{ student: Student }>) => {
      state.data[action.payload.student._id] = action.payload.student;
    },
    removeStudentFromState: (
      state,
      action: PayloadAction<{ studentId: string }>
    ) => {
      delete state.data[action.payload.studentId];
    },
    updateStudentClass: (
      state,
      action: PayloadAction<{ classroomId?: string; studentId: string }>
    ) => {
      const student = state.data[action.payload.studentId];

      if (student) {
        state.data[action.payload.studentId] = {
          ...student,
          classroom: action.payload.classroomId
            ? action.payload.classroomId
            : "",
        };
      }
    },
  },
});

export const {
  setStudents,
  setError,
  addStudentToState,
  removeStudentFromState,
  updateStudentClass,
} = studentsSlice.actions;
export default studentsSlice.reducer;

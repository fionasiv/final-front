import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Student from "../../interfaces/Student";
import { getAllStudents } from "../../requests/StudentsRequests";
import { Mode } from "../../Enums";

interface StudentState {
  data: Record<string, Student>;
  status: Mode;
}

interface State {
  students: StudentState;
}

const initialState: StudentState = {
  data: {},
  status: Mode.LOADING,
};

export const fetchStudents = createAsyncThunk("fetch-students", async () => {
  try {
    const students = await getAllStudents("");
    let studentsMap = Object.fromEntries(
      students.map((student: Student) => [student._id, student])
    );
    return studentsMap;
  } catch (error) {
    throw error;
  }
});

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudentToState: (state, action: PayloadAction<{ student: Student }>) => {
      state.data[action.payload.student._id] = action.payload.student;
    },
    removeStudentFromState: (
      state,
      action: PayloadAction<{ studentId: string }>
    ) => {
      delete state.data[action.payload.studentId];
    },
    addStudentClass: (
      state,
      action: PayloadAction<{ classroomId: string; studentId: string }>
    ) => {
      let student = state.data[action.payload.studentId];

      if (student) {
        state.data[action.payload.studentId] = {
          ...student,
          classroom: action.payload.classroomId,
        };
      }
    },
    removeStudentClass: (
      state,
      action: PayloadAction<{ studentId: string }>
    ) => {
      let student = state.data[action.payload.studentId];

      if (student) {
        state.data[action.payload.studentId] = {
          ...student,
          classroom: "",
        };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Mode.SUCCESS;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = Mode.ERROR;
      });
  },
});

export const getStudents = (state: State) => state.students.data;
export const getStudentsStatus = (state: State) => state.students.status;

export const {
  addStudentToState,
  removeStudentFromState,
  addStudentClass,
  removeStudentClass,
} = studentsSlice.actions;
export default studentsSlice.reducer;

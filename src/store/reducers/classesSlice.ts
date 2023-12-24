import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ShobClass } from "../../types";

interface ClassroomState {
  classrooms: ShobClass[];
}

const initialState: ClassroomState = {
  classrooms: [],
};

export const classroomSlice = createSlice({
  name: "classrooms",
  initialState,
  reducers: {
    setClassrooms: (
      state,
      action: PayloadAction<{ classrooms: ShobClass[] }>
    ) => {
      state.classrooms = action.payload.classrooms.map(
        (classroom) => classroom
      );
    },
    addClassroom: (state, action: PayloadAction<{ classroom: ShobClass }>) => {
      state.classrooms.push(action.payload.classroom);
    },
    removeClassroom: (
      state,
      action: PayloadAction<{ classroomId: string }>
    ) => {
        state.classrooms = state.classrooms.filter(
        (classroom) => classroom._id !== action.payload.classroomId
      );
    },
    subtructClassroomSeat: (
      state,
      action: PayloadAction<{ classroomId: string }>
    ) => {
        state.classrooms = state.classrooms.map((classroom) =>
        classroom._id === action.payload.classroomId
          ? { ...classroom, numberOfSeatsLeft: classroom.numberOfSeatsLeft - 1 }
          : classroom
      );
    },
    addClassroomSeat: (
        state,
        action: PayloadAction<{ classroomId: string }>
      ) => {
        state.classrooms = state.classrooms.map((classroom) =>
          classroom._id === action.payload.classroomId
            ? { ...classroom, numberOfSeatsLeft: classroom.numberOfSeatsLeft + 1 }
            : classroom
        );
      },
  },
});

export const { setClassrooms, addClassroom, removeClassroom, subtructClassroomSeat, addClassroomSeat } =
  classroomSlice.actions;
export default classroomSlice.reducer;

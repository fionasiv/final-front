import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ShobClass } from "../../types";

interface ClassroomState {
  data: ShobClass[];
}

const initialState: ClassroomState = {
    data: [],
};

export const classroomSlice = createSlice({
  name: "classrooms",
  initialState,
  reducers: {
    setClassrooms: (
      state,
      action: PayloadAction<{ classrooms: ShobClass[] }>
    ) => {
      state.data = action.payload.classrooms.map(
        (classroom) => classroom
      );
    },
    addClassroom: (state, action: PayloadAction<{ classroom: ShobClass }>) => {
      state.data.push(action.payload.classroom);
    },
    removeClassroom: (
      state,
      action: PayloadAction<{ classroomId: string }>
    ) => {
        state.data = state.data.filter(
        (classroom) => classroom._id !== action.payload.classroomId
      );
    },
    subtructClassroomSeat: (
      state,
      action: PayloadAction<{ classroomId: string }>
    ) => {
        state.data = state.data.map((classroom) =>
        classroom._id === action.payload.classroomId
          ? { ...classroom, numberOfSeatsLeft: classroom.seatsLeft - 1 }
          : classroom
      );
    },
    addClassroomSeat: (
        state,
        action: PayloadAction<{ classroomId: string }>
      ) => {
        state.data = state.data.map((classroom) =>
          classroom._id === action.payload.classroomId
            ? { ...classroom, numberOfSeatsLeft: classroom.seatsLeft + 1 }
            : classroom
        );
      },
  },
});

export const { setClassrooms, addClassroom, removeClassroom, subtructClassroomSeat, addClassroomSeat } =
  classroomSlice.actions;
export default classroomSlice.reducer;

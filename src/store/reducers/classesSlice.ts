import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ShobClass } from "../../interfaces";

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
    addClassroomToState: (state, action: PayloadAction<{ classroom: ShobClass }>) => {
      state.data.push(action.payload.classroom);
    },
    removeClassroomFromState: (
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
          ? { ...classroom, seatsLeft: classroom.seatsLeft - 1 }
          : classroom
          );
    },
    addClassroomSeat: (
        state,
        action: PayloadAction<{ classroomId: string }>
      ) => {
        state.data = state.data.map((classroom) =>
          classroom._id === action.payload.classroomId
            ? { ...classroom, seatsLeft: classroom.seatsLeft + 1 }
            : classroom
        );
      },
  },
});

export const { setClassrooms, addClassroomToState, removeClassroomFromState, subtructClassroomSeat, addClassroomSeat } =
  classroomSlice.actions;
export default classroomSlice.reducer;

import { PayloadAction, createSlice, Dispatch } from "@reduxjs/toolkit";
import ShobClass from "interfaces/ShobClass";
import { getAllClassrooms } from "requests/ClassroomRequests";
import { Mode } from "../../Enums";

interface ClassroomState {
  data: Record<string, ShobClass>;
  status: Mode;
}

const initialState: ClassroomState = {
  data: {},
  status: Mode.LOADING,
};

export const fetchClassrooms = () => async (dispatch:Dispatch) => {
  try {
    const classrooms = await getAllClassrooms();
    let classroomsMap = Object.fromEntries(
      classrooms.map((classroom: ShobClass) => [
        classroom._id,
        classroom,
      ])
    );
    dispatch(setClassrooms(classroomsMap));
  } catch (error) {
    dispatch(setError());
    throw error;
  }
};

export const classroomSlice = createSlice({
  name: "classrooms",
  initialState,
  reducers: {
    setClassrooms: (state, action: PayloadAction<Record<string, ShobClass>>) => {
      state.data = action.payload;
      state.status = Mode.SUCCESS;
    },
    setError: (state, action: PayloadAction) => {
      state.status = Mode.ERROR;
    },
    addClassroomToState: (
      state,
      action: PayloadAction<{ classroom: ShobClass }>
    ) => {
      state.data[action.payload.classroom._id] = action.payload.classroom;
    },
    removeClassroomFromState: (
      state,
      action: PayloadAction<{ classroomId: string }>
    ) => {
      delete state.data[action.payload.classroomId];
    },
    subtructClassroomSeat: (
      state,
      action: PayloadAction<{ classroomId: string }>
    ) => {
      let classroom = state.data[action.payload.classroomId];

      if (classroom) {
        state.data[action.payload.classroomId] = {
          ...classroom,
          seatsLeft: classroom.seatsLeft - 1,
        };
      }
    },
    addClassroomSeat: (
      state,
      action: PayloadAction<{ classroomId: string }>
    ) => {
      let classroom = state.data[action.payload.classroomId];

      if (classroom) {
        state.data[action.payload.classroomId] = {
          ...classroom,
          seatsLeft: classroom.seatsLeft + 1,
        };
      }
    },
  },
});

export const {
  setClassrooms,
  setError,
  addClassroomToState,
  removeClassroomFromState,
  subtructClassroomSeat,
  addClassroomSeat,
} = classroomSlice.actions;
export default classroomSlice.reducer;

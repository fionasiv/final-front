import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ShobClass from "../../interfaces/ShobClass";
import { getAllClassrooms } from "../../requests/ClassroomRequests";
import { Mode } from "../../Enums";

interface ClassroomState {
  data: Record<string, ShobClass>;
  status: Mode;
}

interface State {
  classrooms: ClassroomState;
}

const initialState: ClassroomState = {
  data: {},
  status: Mode.LOADING,
};

export const fetchClassrooms = createAsyncThunk("fetch-classes", async () => {
  try {
    const classrooms = await getAllClassrooms();
    let classroomsMap = Object.fromEntries(
      classrooms.map((classroom: ShobClass) => [
        classroom._id,
        classroom,
      ])
    );
    return classroomsMap;
  } catch (error) {
    throw error;
  }
});

export const classroomSlice = createSlice({
  name: "classrooms",
  initialState,
  reducers: {
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
  extraReducers(builder) {
    builder
      .addCase(fetchClassrooms.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Mode.SUCCESS;
      })
      .addCase(fetchClassrooms.rejected, (state, action) => {
        state.status = Mode.ERROR;
      })
  },
});

export const getClassrooms = (state: State) => state.classrooms.data;
export const getClassroomsStatus = (state: State) => state.classrooms.status;

export const {
  addClassroomToState,
  removeClassroomFromState,
  subtructClassroomSeat,
  addClassroomSeat,
} = classroomSlice.actions;
export default classroomSlice.reducer;

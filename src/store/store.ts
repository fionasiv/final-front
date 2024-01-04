import { configureStore } from "@reduxjs/toolkit";
import classroomsReducer from "./reducers/classesSlice";
import studentsReducer from "./reducers/studentsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    classrooms: classroomsReducer,
    students: studentsReducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

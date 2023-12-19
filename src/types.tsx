import { ReactNode } from "react";

export type PageRoute = {
  path: string;
  name: string;
  Component: ReactNode;
};

export type Student = {
  _id: string,
  firstName: string,
  lastName: string,
  age: number,
  profession: string,
  classroom: string
  __v?: number
}

export type displayedItem = {
  id: string,
  name: string
}

export type ShobClass = {
  _id: string,
  name: string;
  numberOfSeats: number;
  numberOfSeatsLeft: number;
  __v?: number;
};

export type Field = {
  label: string;
  id: string;
  type: string;
  check: Function;
  required?: boolean | null;
};
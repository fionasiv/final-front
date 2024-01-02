import { ReactNode } from "react";

export interface PageRoute {
  path: string;
  name: string;
  Component: ReactNode;
  props?: string;
}

export interface displayedItem {
  id: string;
  name: string;
}

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  age?: number;
  profession: string;
  classroom: string;
  __v?: number;
}

export interface ShobClass {
  _id: string;
  name: string;
  capacity: number;
  seatsLeft: number;
  __v?: number;
}

export interface Field {
  label: string;
  id: string;
  type: string;
  check: Function;
  required?: boolean | null;
}

export interface FieldCheck {
  isValid: boolean;
  invalidMsg: string;
}

export interface ThemeData {
  name: string;
  hexColor: string;
}
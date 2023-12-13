import { ReactNode } from "react";

export type PageRoute = {
  path: string;
  name: string;
  Component: ReactNode;
};

export type ShobClass = {
  name: string;
  availableSeats: number;
  totalSeats: number;
};

export type Field = {
  label: string;
  id: string;
  type: string;
  check: Function;
  required?: boolean | null;
};
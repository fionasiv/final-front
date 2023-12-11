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

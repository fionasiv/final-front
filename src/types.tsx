import { ReactNode } from "react";

export type PageRoute = {
  path: string;
  name: string;
  Component: ReactNode;
};

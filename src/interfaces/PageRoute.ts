import { ReactNode } from "react";

export default interface PageRoute {
  path: string;
  name: string;
  Component: ReactNode;
  props?: string;
}

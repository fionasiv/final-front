import { ReactNode } from "react";

export interface ErrorProps {
  url?: string;
  image: ReactNode;
  title: string;
  description: string;
  linkTitle?: string;
}
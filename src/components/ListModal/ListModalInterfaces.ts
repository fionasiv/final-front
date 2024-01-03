import { ReactNode } from "react";
import DisplayedItem from "../../interfaces/DisplayedItem";

export interface ListModalProps {
  list: DisplayedItem[];
  avatarIcon: ReactNode;
  handleClick: Function;
  buttonIcon: ReactNode;
  emptyListMsg: string;
  id?: string;
  open: boolean;
  handleClose: Function;
  title: string;
}

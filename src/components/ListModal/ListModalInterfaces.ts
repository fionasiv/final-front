import { ReactNode } from "react";
import DisplayedItem from "../../interfaces/DisplayedItem";

export interface ListModalProps {
  list: DisplayedItem[];
  avatarIcon: ReactNode;
  handleClick: (itemId: string) => Promise<void>;
  buttonIcon: ReactNode;
  emptyListMsg: string;
  id?: string;
  open: boolean;
  handleClose: () => void;
  title: string;
}

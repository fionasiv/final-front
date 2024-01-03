import React from "react";
import * as S from "./ListModal.style";
import { Modal } from "@mui/material";
import { ThemeContext } from "../../App";
import DisplayedItem from "../../interfaces/DisplayedItem";
import { ListModalProps } from "./ListModalInterfaces";

export default function ListModal({
  list,
  avatarIcon,
  handleClick,
  buttonIcon,
  emptyListMsg,
  id,
  open,
  handleClose,
  title,
}: ListModalProps) {
  const theme = React.useContext(ThemeContext);

  const items = list.map((item: DisplayedItem) => (
    <S.Item key={item.id}>
      <S.IconAvatar>
        {avatarIcon}
      </S.IconAvatar>
      <S.Name>{item.name}</S.Name>
      <S.Button
        coloring={theme.hexColor}
        onClick={() => handleClick(item.id)}
      >
        {buttonIcon}
      </S.Button>
    </S.Item>
  ));

  const noItemsMessage = (
    <S.Item>
      <S.Name>{emptyListMsg}</S.Name>
    </S.Item>
  );

  return (
    <Modal key={id} open={open} onClose={() => handleClose()}>
      <S.DesignedBox>
        <S.ListWrapper>
          <S.Title>{title}</S.Title>
          {list.length ? items : noItemsMessage}
        </S.ListWrapper>
      </S.DesignedBox>
    </Modal>
  );
}

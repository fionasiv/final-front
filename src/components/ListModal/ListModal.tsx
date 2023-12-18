import React from "react";
import * as S from "./ListModal.style";
import { Modal } from "@mui/material";
import { ThemeContext } from "../../App";
import { displayedItem } from "../../types";

export default function ListModal(props: any) {
  const theme = React.useContext(ThemeContext);

  const items = props.list.map((item: displayedItem) => (
    <S.Item key={item.id}>
      <S.IconAvatar>
        <props.avatarIcon />
      </S.IconAvatar>
      <S.Name>{item.name}</S.Name>
      <S.Button coloring={theme} onClick={() => props.handleClick(item.id)}>
        <props.buttonIcon />
      </S.Button>
    </S.Item>
  ));

  const noItemsMessage = (
    <S.Item>
      <S.Name>{props.emptyListMsg}</S.Name>
    </S.Item>
  );

  return (
    <Modal key={props.id} open={props.open} onClose={props.handleClose}>
      <S.DesignedBox>
        <S.Title>{props.title}</S.Title>
        {props.list.length ? items : noItemsMessage}
      </S.DesignedBox>
    </Modal>
  );
}

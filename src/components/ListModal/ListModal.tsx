import React from "react";
import * as S from "./ListModal.style";
import { Modal } from "@mui/material";
import { ThemeContext } from "../../App";

export default function ListModal(props: any) {
  const theme = React.useContext(ThemeContext);

  const items = props.students.map((student: string) => (
    <S.Item>
      <S.IconAvatar><props.avatarIcon /></S.IconAvatar>
      <S.Name>{student}</S.Name>
      <S.Button coloring={theme}>
        <props.buttonIcon />
      </S.Button>
    </S.Item>
  ));

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <S.DesignedBox>
        <S.Title>{props.title}</S.Title>
        {items}
      </S.DesignedBox>
    </Modal>
  );
}

import * as S from "./Class.style";
import { CardContent, IconButton } from "@mui/material";
import { ThemeContext } from "../../App";
import React from "react";

export default function Class(props: any) {
  const theme = React.useContext(ThemeContext);
  
  return (
    <S.ClassCard>
      <CardContent>
        <S.ClassName>{props.name}</S.ClassName>
        <S.SeatsLeft>
          there are <b>{props.avilableSeats}</b> seats left
        </S.SeatsLeft>
        <S.SeatsTotal>out of {props.totalSeats}</S.SeatsTotal>
      </CardContent>
      <S.Actions>
        <S.StudentsButton>STUDENTS LIST</S.StudentsButton>
        <IconButton>
          <S.Delete coloring={theme} />
        </IconButton>
      </S.Actions>
    </S.ClassCard>
  );
}

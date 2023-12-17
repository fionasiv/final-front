import * as S from "./Class.style";
import { CardContent, IconButton } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeContext } from "../../App";
import React from "react";
import ListModal from "../ListModal/ListModal";
import { API_CONNECTION_URL } from "../../consts/AppConsts";

export default function Class(props: any) {
  const [open, setOpen] = React.useState(false);
  const theme = React.useContext(ThemeContext);

  const handleClick = () => setOpen((prevOpen) => !prevOpen);

  const removeClass = async () => {
    try {
      await fetch(
        `${API_CONNECTION_URL}/classrooms/${props.id}`,
        { method: "DELETE" }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const removeStudent = async (studentId: string) => {
    try {
      await fetch(
        `${API_CONNECTION_URL}/classrooms/${props.id}/students/${studentId}`,
        { method: "PATCH" }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <S.ClassCard>
        <CardContent>
          <S.ClassName>{props.name}</S.ClassName>
          <S.SeatsLeft>
            there are <b>{props.avilableSeats}</b> seats left
          </S.SeatsLeft>
          <S.SeatsTotal>out of {props.totalSeats}</S.SeatsTotal>
        </CardContent>
        <S.Actions>
          <S.StudentsButton onClick={handleClick}>
            STUDENTS LIST
          </S.StudentsButton>
          <IconButton onClick={removeClass}>
            <S.Delete coloring={theme} />
          </IconButton>
        </S.Actions>
      </S.ClassCard>
      <ListModal
        open={open}
        handleClose={handleClick}
        list={props.students}
        title="Class Students"
        avatarIcon={Person2Icon}
        buttonIcon={DeleteIcon}
        handleClick={removeStudent}
      />
    </>
  );
}

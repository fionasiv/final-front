import * as S from "./Class.style";
import { CardContent, IconButton } from "@mui/material";
import Person2Icon from '@mui/icons-material/Person2';
import SchoolIcon from '@mui/icons-material/School'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ThemeContext } from "../../App";
import React from "react";
import ListModal from "../ListModal/ListModal";

export default function Class(props: any) {
  const [open, setOpen] = React.useState(false);
  const theme = React.useContext(ThemeContext);

  const handleClick = () => setOpen((prevOpen) => !prevOpen);

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
          <IconButton>
            <S.Delete coloring={theme} />
          </IconButton>
        </S.Actions>
      </S.ClassCard>
      <ListModal
        open={open}
        handleClose={handleClick}
        students={props.students}
        title="Class Students"
        avatarIcon={Person2Icon}
        buttonIcon={DeleteIcon}
      />
    </>
  );
}

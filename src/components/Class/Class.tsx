import * as S from "./Class.style";
import { CardContent, IconButton } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import ListModal from "../ListModal/ListModal";
import { Student } from "../../types";
import {
  getAllStudents,
  removeStudentFromClassroom,
} from "../../requests/StudentsRequests";

export default function Class(props: any) {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([] as Student[]);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const classStudents = await getAllStudents(`classroom/${props.id}`);
        setStudents(
          classStudents.map((student: Student) => {
            return {
              id: student._id,
              name: `${student.firstName} ${student.lastName}`,
            };
          })
        );
      };

      fetchData();
    }
  }, [open, props.id]);

  const handleClick = () => setOpen((prevOpen) => !prevOpen);

  const removeStudent = async (studentId: string) => {
    try {
      await removeStudentFromClassroom(studentId);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
      handleClick();
      props.removeStudentFromClass(props.id);
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
          <IconButton onClick={() => props.removeClass(props.id)}>
            <S.Delete coloring={theme} />
          </IconButton>
        </S.Actions>
      </S.ClassCard>
      <ListModal
        id={props.id}
        key={props.id}
        open={open}
        handleClose={handleClick}
        list={students}
        title="Class Students"
        emptyListMsg="No students have been registered to this classroom."
        avatarIcon={Person2Icon}
        buttonIcon={DeleteIcon}
        handleClick={removeStudent}
      />
    </>
  );
}

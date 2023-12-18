import * as S from "./Class.style";
import { CardContent, IconButton } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import ListModal from "../ListModal/ListModal";
import { API_CONNECTION_URL } from "../../consts/AppConsts";
import { ShobClass, Student } from "../../types";
import { getAllStudents } from "../../requests/StudentsRequests";

export default function Class(props: any) {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      const classStudents = await getAllStudents(`classroom/${props.id}`);
      setStudents(classStudents.map((student: Student) => {
        return {
          id: student._id,
          name: `${student.firstName} ${student.lastName}`
        }
      }));
    };

    fetchData();
  }, []);

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
        list={students}
        title="Class Students"
        avatarIcon={Person2Icon}
        buttonIcon={DeleteIcon}
        handleClick={removeStudent}
      />
    </>
  );
}

import * as S from "./Class.style";
import { CardContent, IconButton } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeContext } from "../../App";
import { useState, useContext, useEffect } from "react";
import ListModal from "../ListModal/ListModal";
import { Student } from "../../interfaces";
import {
  getAllStudents,
  removeStudentFromClassroom,
} from "../../requests/StudentsRequests";
import { SwalToast } from "../SwalToast/SwalToast";
import { useAppDispatch } from "../../store/store";
import { addClassroomSeat } from "../../store/reducers/classesSlice";

export default function Class(props: any) {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();

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
  }, [open]);

  const handleClick = () => setOpen((prevOpen) => !prevOpen);

  const removeStudentFromClass = async (studentId: string) => {
    try {
      await removeStudentFromClassroom(studentId);
      handleClick();
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
      dispatch(addClassroomSeat({ classroomId: props.id }));
      SwalToast.fire({
        icon: "success",
        iconColor: theme.hexColor,
        title: "הסטודנט/ית נמחק/ה מהכיתה בהצלחה!",
      });
    } catch (error) {
      SwalToast.fire({
        icon: "error",
        iconColor: theme.hexColor,
        text: "חלה תקלה בעת מחיקת הסטודנט/ית מהכיתה",
      });
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
            <S.Delete coloring={theme.hexColor} />
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
        emptyListMsg="No students have been assigned to this classroom."
        avatarIcon={Person2Icon}
        buttonIcon={DeleteIcon}
        handleClick={removeStudentFromClass}
      />
    </>
  );
}

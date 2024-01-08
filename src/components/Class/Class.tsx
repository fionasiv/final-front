import * as S from "./Class.style";
import { CardContent, IconButton } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import ListModal from "../ListModal/ListModal";
import DisplayedItem from "../../interfaces/DisplayedItem";
import {
  getAllStudents,
  getClassroomStudents,
  removeStudentFromClassroom,
} from "../../requests/StudentsRequests";
import { SwalToast } from "../SwalToast/SwalToast";
import { useAppDispatch } from "../../store/store";
import { addClassroomSeat } from "../../store/reducers/classesSlice";
import { classProps } from "./ClassInterfaces";
import Student from "../../interfaces/Student";
import { updateStudentClass } from "../../store/reducers/studentsSlice";
import { useTheme } from "../../contexts/Theme";

export default function Class({
  id,
  name,
  avilableSeats,
  totalSeats,
  removeClass,
}: classProps) {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState<DisplayedItem[]>([]);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const classStudents = await getClassroomStudents(id);
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
        prevStudents.filter((student) => student.id !== studentId)
      );
      dispatch(updateStudentClass({ studentId: studentId }));
      dispatch(addClassroomSeat({ classroomId: id }));
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
          <S.ClassName>{name}</S.ClassName>
          <S.SeatsLeft>
            there are <b>{avilableSeats}</b> seats left
          </S.SeatsLeft>
          <S.SeatsTotal>out of {totalSeats}</S.SeatsTotal>
        </CardContent>
        <S.Actions>
          <S.StudentsButton onClick={handleClick}>
            STUDENTS LIST
          </S.StudentsButton>
          <IconButton onClick={() => removeClass(id)}>
            <S.Delete coloring={theme.hexColor} />
          </IconButton>
        </S.Actions>
      </S.ClassCard>
      <ListModal
        id={id}
        key={id}
        open={open}
        handleClose={handleClick}
        list={students}
        title="Class Students"
        emptyListMsg="No students have been assigned to this classroom."
        avatarIcon={<Person2Icon />}
        buttonIcon={<DeleteIcon />}
        handleClick={removeStudentFromClass}
      />
    </>
  );
}

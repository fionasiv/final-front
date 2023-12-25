import { useState, useContext } from "react";
import * as S from "./Table.style";
import { columns } from "../../consts/TableConsts";
import { ThemeContext } from "../../App";
import ListModal from "../ListModal/ListModal";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { displayedItem } from "../../interfaces";
import { subtructClassroomSeat } from "../../store/reducers/classesSlice";

export default function Table(props: any) {
  const theme = useContext(ThemeContext);
  const [open, setOpen] = useState<boolean>(false);
  const [currStudent, setCurrStudent] = useState<string>("");
  const [availableClasses, setAvailableClasses] = useState<displayedItem[]>([]);
  const classrooms = useAppSelector((state) => state.classrooms.data);
  const dispatch = useAppDispatch();

  const deleteButton = (props: any) => {
    async function handleDelete() {
      const studentId = props.row.id;
      await removeStudent(studentId);
    }
    
    return (
      <S.TableButton coloring={theme} onClick={handleDelete}>
        Delete
      </S.TableButton>
    );
  };
  
  const assignButton = (props: any) => {
    const disableButton = props.row.classroom !== "";
    const handleClick = async () => {
      updateAvilabillity();
      handleOpen();
      setCurrStudent(props.row._id);
    };
    
    return (
      <S.TableButton
      coloring={theme}
      onClick={handleClick}
      disabled={disableButton}
      >
        Assign to class
      </S.TableButton>
    );
  };
  
  const addStudentToClass = async (classId: string) => {
    await props.addStudent(classId, currStudent);
    handleOpen();
    dispatch(subtructClassroomSeat({classroomId: classId}))
  };

  const removeStudent = async (studentId: string) => {
    await props.deleteStudent(studentId);
  };
  
  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  
  const updateAvilabillity = () => {
    const available = classrooms
    .filter((classroom) => classroom.seatsLeft > 0)
    .map((classroom) => {
      return {
        id: classroom._id,
        name: classroom.name,
      };
    });

    setAvailableClasses(available);
  }
  
  return (
    <>
      <S.DesignedBox>
        <S.Table
          rows={props.students}
          columns={[
            ...columns,
            {
              field: "action",
              headerName: "Action",
              headerAlign: "center",
              align: "center",
              minWidth: 230,
              flex: 1,
              sortable: false,
              renderCell: assignButton,
            },
            {
              field: "delete",
              headerName: "Delete",
              headerAlign: "center",
              align: "center",
              minWidth: 140,
              flex: 1,
              sortable: false,
              renderCell: deleteButton,
            },
          ]}
          rowHeight={75}
          disableRowSelectionOnClick
          disableColumnFilter
          hideFooter
          disableColumnMenu
        />
      </S.DesignedBox>
      <ListModal
        open={open}
        handleClose={handleOpen}
        list={availableClasses}
        title="Available Classes"
        emptyListMsg="There are no classes available at the moment"
        avatarIcon={SchoolIcon}
        buttonIcon={AddIcon}
        handleClick={addStudentToClass}
      />
    </>
  );
}

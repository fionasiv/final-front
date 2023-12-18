import React from "react";
import { useState, useEffect } from "react";
import * as S from "./Table.style";
import { columns } from "../../consts/TableConsts";
import { ThemeContext } from "../../App";
import ListModal from "../ListModal/ListModal";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import { getAvailableClasses } from "../../requests/ClassroomRequests";
import {
  addStudentToClassroom,
  deleteStudent,
  getAllStudents,
} from "../../requests/StudentsRequests";
import { Student } from "../../types";



export default function Table() {
  const theme = React.useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [currStudent, setCurrStudent] = useState('');
  const [students, setStudents] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const studentsList = await getAllStudents("");
      
      setStudents(
        studentsList.map((student: Student) => {
          return {
            ...student,
            id: student._id,
          };
        })
        );
        setAvailableClasses(await getAvailableClasses());
      };
      fetchData();
    }, []);
    
    const handleOpen = () => {
      setOpen((prevOpen) => !prevOpen)
    }
    
    const addStudentToClass = async (classId: string) => {
      await addStudentToClassroom(classId, currStudent);
      window.location.reload()
    };

    const deleteButton = (props: any) => {
      async function handleDelete() {
        const studentId = props.row.id;
        await deleteStudent(studentId);
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
        handleOpen();
        setCurrStudent(props.row._id)
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

  return (
    <>
      <S.DesignedBox>
        <S.Table
          rows={students}
          columns={[
            ...columns,
            {
              field: "action",
              headerName: "Action",
              headerAlign: "center",
              align: "center",
              width: 230,
              sortable: false,
              renderCell: assignButton,
            },
            {
              field: "delete",
              headerName: "Delete",
              headerAlign: "center",
              align: "center",
              width: 140,
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
        avatarIcon={SchoolIcon}
        buttonIcon={AddIcon}
        handleClick={addStudentToClass}
      />
    </>
  );
}

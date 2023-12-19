import React from "react";
import { useState } from "react";
import * as S from "./Table.style";
import { columns } from "../../consts/TableConsts";
import { ThemeContext } from "../../App";
import ListModal from "../ListModal/ListModal";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import { deleteStudent } from "../../requests/StudentsRequests";

export default function Table(props: any) {
  const theme = React.useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [currStudent, setCurrStudent] = useState("");

  const addStudentToClass = async (classId: string) => {
    await props.addStudent(classId, currStudent);
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

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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
        list={props.availableClasses}
        title="Available Classes"
        emptyListMsg="There are no classes available at the moment"
        avatarIcon={SchoolIcon}
        buttonIcon={AddIcon}
        handleClick={addStudentToClass}
      />
    </>
  );
}
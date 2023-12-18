import React from "react";
import { useState } from "react";
import * as S from "./Table.style";
import { columns } from "../../consts/TableConsts";
import { API_CONNECTION_URL, availableClasses } from "../../consts/AppConsts";
import { ThemeContext } from "../../App";
import ListModal from "../ListModal/ListModal";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import { Student } from "../../types";

export default function Table() {
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const theme = React.useContext(ThemeContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_CONNECTION_URL}/students`);
        const allData = await response.json();
        setStudents(
          allData.map((student: Student) => {
            return {
              id: student._id,
              firstName: student.firstName,
              lastName: student.lastName,
              age: student.age,
              profession: student.profession,
            };
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    setOpen((prevOpen) => !prevOpen);

    if (open) {
      try {
        const response = await fetch(
          `${API_CONNECTION_URL}/classrooms/available`,
        );
        const allData = await response.json();
        setAvailableClasses(allData);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const assignButton = () => {
    return (
      <S.TableButton coloring={theme} onClick={handleClick}>
        Assign to class
      </S.TableButton>
    );
  };

  const deleteButton = (props: any) => {
    async function handleDelete() {
      const studentId = props.row.id;
      try {
        await fetch(
          `${API_CONNECTION_URL}/students/${studentId}`,
          { method: "DELETE" }
        );
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
    return (
      <S.TableButton coloring={theme} onClick={handleDelete}>
        Delete
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
          slots={{
            footer: () => <></>,
            columnMenu: () => <></>,
            columnMenuIcon: () => <></>,
          }}
          rowHeight={75}
          disableRowSelectionOnClick
          disableColumnFilter
        />
      </S.DesignedBox>
      <ListModal
        open={open}
        handleClose={handleClick}
        list={availableClasses}
        title="Available Classes"
        avatarIcon={SchoolIcon}
        buttonIcon={AddIcon}
      />
    </>
  );
}

import React from "react";
import { useState } from "react";
import * as S from "./Table.style";
import { columns, rows } from "../../consts/TableConsts";
import { availableClasses } from "../../consts/consts";
import { ThemeContext } from "../../App";
import ListModal from "../ListModal/ListModal";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";

export default function Table() {
  const [open, setOpen] = useState(false);
  const theme = React.useContext(ThemeContext);

  function handleClick() {
    setOpen((prevOpen) => !prevOpen);
  }

  const assignButton = () => {
    return (
      <S.TableButton coloring={theme} onClick={handleClick}>
        Assign to class
      </S.TableButton>
    );
  };

  const deleteButton = () => {
    function handleDelete() {
      console.log("delete");
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
          rows={rows}
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
              renderCell: deleteButton
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
        students={availableClasses}
        title="Available Classes"
        avatarIcon={SchoolIcon}
        buttonIcon={AddIcon}
      />
    </>
  );
}

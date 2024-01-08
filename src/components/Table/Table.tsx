import { useState } from "react";
import * as S from "./Table.style";
import { columns } from "../../consts/Table";
import ListModal from "../ListModal/ListModal";
import SchoolIcon from "@mui/icons-material/School";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "../../store/store";
import DisplayedItem from "../../interfaces/DisplayedItem";
import { TableProps } from "./TableInterfaces";
import ShobClass from "../../interfaces/ShobClass";
import { useTheme } from "../../contexts/Theme";

export default function Table({ addItem, deleteItem, dataList }: TableProps) {
  const theme = useTheme()[0];
  const [open, setOpen] = useState<boolean>(false);
  const [currStudent, setCurrStudent] = useState<string>("");
  const [availableClasses, setAvailableClasses] = useState<DisplayedItem[]>([]);
  const classrooms = useAppSelector((state) => state.classrooms.data);

  const deleteButton = (props: any) => {
    async function handleDelete() {
      const studentId = props.row.id;
      await removeStudent(studentId);
    }

    return (
      <S.TableButton coloring={theme.hexColor} onClick={handleDelete}>
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
    const buttonText = disableButton ? "Assigned" : "Assign to class";

    return (
      <S.TableButton
        coloring={theme.hexColor}
        onClick={handleClick}
        disabled={disableButton}
      >
        {buttonText}
      </S.TableButton>
    );
  };

  const addStudentToClass = async (classId: string) => {
    await addItem(classId, currStudent);
    handleOpen();
  };

  const removeStudent = async (studentId: string) => {
    await deleteItem(studentId);
  };

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const updateAvilabillity = () => {
    setAvailableClasses((prevAvailable) =>
      Object.values(classrooms)
        .filter((classroom: ShobClass) => classroom.seatsLeft > 0)
        .map((classroom: ShobClass) => {
          return {
            id: classroom._id,
            name: classroom.name,
          };
        })
    );
  };

  return (
    <>
      <S.DesignedBox>
        <S.Table
          rows={dataList}
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
        avatarIcon={<SchoolIcon />}
        buttonIcon={<AddIcon />}
        handleClick={addStudentToClass}
      />
    </>
  );
}

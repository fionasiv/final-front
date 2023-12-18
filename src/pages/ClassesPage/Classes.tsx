import React, { useState, useEffect } from "react";
import * as S from "./Classes.style";
import Class from "../../components/Class/Class";
import { ShobClass, Student } from "../../types";
import { API_CONNECTION_URL } from "../../consts/AppConsts";

export default function Classes() {
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_CONNECTION_URL}/classrooms`);
        const allData = await response.json();
        setClassrooms(
          allData.map((classroom: ShobClass) => {
            return {
              _id: classroom._id,
              name: classroom.name,
              numberOfSeatsLeft: classroom.numberOfSeatsLeft,
              numberOfSeats: classroom.numberOfSeats,
            };
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const shobClasses = classrooms.map((shobClass: ShobClass) => (
      <Class
        id={shobClass._id}
        name={shobClass.name}
        avilableSeats={shobClass.numberOfSeatsLeft}
        totalSeats={shobClass.numberOfSeats}
      />
    )
  );
  return <S.ClassesList>{shobClasses}</S.ClassesList>;
}

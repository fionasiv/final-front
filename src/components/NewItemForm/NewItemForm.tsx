import * as S from "./NewItemForm.style";
import { ThemeContext } from "../../App";
import React from "react";
import { Field } from "../../types";

export default function NewItemForm(props: any) {
  const theme = React.useContext(ThemeContext);
  const fieldNames = props.fields.map((field: Field) => field.id);
  const fieldObjects: any = {};
  fieldNames.forEach((field: string) => (fieldObjects[field] = ""));
  const [inputs, setInputs] = React.useState(fieldObjects);

  const handleChange = (event: React.SyntheticEvent, fieldId: string) => {
    let target = event.target as HTMLInputElement;
    setInputs((oldInputs: any) => ({
      ...oldInputs,
      [fieldId]: target.value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await props.handleCreate(inputs);
  };

  const isFormValid = () => {
    let isValid = true;
    props.fields.forEach((field: Field) => {
      if (!field.check(inputs[field.id])) {
        isValid = false;
      }
    });
    return isValid;
  };

  const fields = props.fields.map((field: Field) => {
    return (
      <S.Field
        id={field.id}
        value={inputs[field.id]}
        required={field.required ? true : false}
        label={field.label}
        type={field.type !== "string" ? field.type : ""}
        onChange={(event) => handleChange(event, field.id)}
        error={!field.check(inputs[field.id]) && inputs[field.id] !== ""}
      />
    );
  });

  return (
    <S.FormBox>
      <S.FormSection>
        <S.Title>{props.title}</S.Title>
        <S.FormFields>
          {fields}
          <S.SubmitButton
            type="submit"
            coloring={theme}
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            {props.createMessage}
          </S.SubmitButton>
        </S.FormFields>
      </S.FormSection>
    </S.FormBox>
  );
}

import * as S from "./NewItemForm.style";
import { ThemeContext } from "../../App";
import { useState, useContext } from "react";
import { Field } from "../../types";
import Confetti from "react-confetti";

export default function NewItemForm(props: any) {
  const theme = useContext(ThemeContext);
  const fieldNames = props.fields.map((field: Field) => field.id);
  const fieldObjects: any = {};
  fieldNames.forEach((field: string) => (fieldObjects[field] = ""));

  const [inputs, setInputs] = useState(fieldObjects);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (event: React.SyntheticEvent, fieldId: string) => {
    let target = event.target as HTMLInputElement;
    setInputs((oldInputs: any) => ({
      ...oldInputs,
      [fieldId]: target.value,
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const didCreate = await props.handleCreate(inputs);
    setInputs(fieldObjects);

    if (didCreate) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000)
    }
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
        key={field.id}
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
      {showConfetti && <Confetti 
            width={window.innerWidth}
            height={window.innerHeight}
            tweenDuration={5000}
            recycle={false}
          />}
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

import * as S from "./Form.style";
import { ThemeContext } from "../../App";
import { useState, useContext } from "react";
import { Field } from "../../interfaces";
import Confetti from "react-confetti";

export default function Form(props: any) {
  const theme = useContext(ThemeContext);
  const fieldNames = props.fields.map((field: Field) => field.id);
  const fieldObjects: Record<string, string> = {};
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
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const isFormValid = () => {
    let isValid = true;
    props.fields.forEach((field: Field) => {
      if (!field.check(inputs[field.id]).isValid) {
        isValid = false;
      }
    });

    return isValid;
  };

  const fields = props.fields.map((field: Field) => {
    const showError =
      !field.check(inputs[field.id]).isValid && inputs[field.id] !== "";

    return (
      <>
        <S.Field
          id={field.id}
          key={field.id}
          value={inputs[field.id]}
          required={field.required ? true : false}
          label={field.label}
          onChange={(event) => handleChange(event, field.id)}
          error={showError}

        />
        {showError && (
          <S.Helper error={true} dir="rtl">
            {field.check(inputs[field.id]).invalidMsg}
          </S.Helper>
        )}
      </>
    );
  });

  return (
    <S.FormBox>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          tweenDuration={5000}
          recycle={false}
        />
      )}
      <S.FormSection>
        <S.Title>{props.title}</S.Title>
        <S.FormFields>
          {fields}
          <S.SubmitButton
            type="submit"
            coloring={theme.hexColor}
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

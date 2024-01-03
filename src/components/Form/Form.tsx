import * as S from "./Form.style";
import { ThemeContext } from "../../App";
import { useState, useContext } from "react";
import Field from "../../interfaces/Field";
import Confetti from "react-confetti";
import { FormProps } from "./FormInterfaces";

export default function Form({
  id,
  fields,
  handleCreate,
  title,
  createMessage,
}: FormProps) {
  const theme = useContext(ThemeContext);
  const fieldNames = fields.map((field: Field) => field.id);
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
    const didCreate = await handleCreate(inputs);
    setInputs(fieldObjects);

    if (didCreate) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const isFormValid = () => {
    let isValid = true;
    fields.forEach((field: Field) => {
      if (!field.check(inputs[field.id]).isValid && field.required) {
        isValid = false;
      }
    });

    return isValid;
  };

  const fieldsList = fields.map((field: Field) => {
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
        <S.Title>{title}</S.Title>
        <S.FormFields>
          {fieldsList}
          <S.SubmitButton
            type="submit"
            coloring={theme.hexColor}
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            {createMessage}
          </S.SubmitButton>
        </S.FormFields>
      </S.FormSection>
    </S.FormBox>
  );
}

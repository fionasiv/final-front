import * as S from "./Form.style";
import { useState } from "react";
import Field from "../../interfaces/Field";
import Confetti from "react-confetti";
import { FormProps } from "./FormInterfaces";
import { useTheme } from "../../contexts/Theme";

export default function Form({
  fields,
  handleCreate,
  title,
  createMessage,
}: FormProps) {
  const theme = useTheme()[0];
  const fieldNames = fields.map((field: Field) => field.id);
  const fieldObjects: Record<string, string> = {};
  fieldNames.forEach((field: string) => (fieldObjects[field] = "")); 

  const [inputs, setInputs] = useState(fieldObjects);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formFields, setFormFields] = useState(
    fields.map((field: Field) => {
      return { ...field, isTouched: false };
    })
  );

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
    setFormFields(
      fields.map((field: Field) => {
        return { ...field, isTouched: false };
      })
    );

    if (didCreate) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleFocus = (field: Field) => {
    field.isTouched = true;
  };

  const isFormValid = () => {
    return !formFields.some((field: Field) => {
      return !field.check(inputs[field.id]).isValid && field.required;
    });
  };

  const fieldsList = formFields.map((field: Field) => {
    const showError =
      !field.check(inputs[field.id]).isValid &&
      (inputs[field.id] !== "" || (field.required && field.isTouched));

    return (
      <>
        <S.Field
          id={field.id}
          key={field.id}
          value={inputs[field.id]}
          required={!!field.required}
          label={field.label}
          onChange={(event) => handleChange(event, field.id)}
          onFocus={() => handleFocus(field)}
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

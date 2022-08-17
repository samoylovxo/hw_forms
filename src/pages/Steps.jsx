import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputMask from "react-input-mask";
import styled from "styled-components";

const HEADERS_MOCK = [
  {
    id: 1,
    title: "Дата (ДД.ММ.ГГ)",
  },
  {
    id: 2,
    title: "Пройдено км",
  },
  {
    id: 3,
    title: "Действия",
  },
];

const StyledPageSteps = styled.div`
  height: 100vh;

  display: grid;
  justify-content: center;
  align-items: center;

  background-color: #110e1d;

  overflow-y: auto;
`;

const StyledContent = styled.div`
  padding: 24px;
  margin: 24px 0;

  display: grid;
  gap: 48px;

  border: 1px solid #dfdfdf;
  border-radius: 2px;

  background-color: #ffffff;
`;

const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 24px;
`;

const StyledInput = styled.input`
  padding: 8px 16px;
  width: 100%;

  border: 1px solid #b2b2b2;

  outline: none;
  transition: border-color 0.4s;

  font-size: 16px;
  line-height: 20px;
  text-align: center;

  &:focus {
    border-color: #5d5d5d;
  }
`;

const StyledButton = styled.button`
  padding: 8px 16px;

  border: 0;

  background-color: #333887;

  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-transform: uppercase;
`;

const StyledStepsWrapper = styled.div`
  display: grid;
  gap: 24px;
`;

const StyledColumns = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  align-items: center;
  justify-items: center;
  gap: 24px;

  text-align: center;
`;

const StyledTableValue = styled.div`
  padding: 8px 16px;
`;

const StyledPlaceholder = styled.div`
  padding: 24px;

  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  text-align: center;
`;

const INITIAL_FORM = {
  id: -1,
  date: "",
  distance: "",
};

const PageSteps = () => {
  const [steps, setSteps] = useState([]);
  const [stepForm, setStepForm] = useState(INITIAL_FORM);

  const handleCreateStepSubmit = () => {
    const activeDate = new Date(stepForm.date.split(".").reverse().join("-"));

    if (
      !stepForm.distance ||
      !(activeDate instanceof Date && !isNaN(activeDate))
    )
      return;

    const activeStep = {
      ...stepForm,
      id: uuidv4(),
      date: activeDate,
    };

    const matchStep = steps.find(
      (step) => step.date.getTime() === activeDate.getTime()
    );

    const newState = (
      matchStep
        ? steps.map((step) =>
            step.id === matchStep.id
              ? { ...step, distance: +matchStep.distance + +stepForm.distance }
              : step
          )
        : [...steps, activeStep]
    ).sort((a, b) => b.date - a.date);

    setSteps(newState);
    setStepForm(INITIAL_FORM);
  };

  const handleDeleteStepButtonClick = (id) => {
    setSteps((prev) => prev.filter((step) => step.id !== id));
  };

  return (
    <StyledPageSteps>
      <StyledContent>
        <StyledForm
          onSubmit={(event) => {
            event.preventDefault();
            handleCreateStepSubmit();
          }}
        >
          <StyledInput
            as={InputMask}
            mask="99.99.9999"
            placeholder="Введите дату"
            value={stepForm.date}
            onChange={(event) =>
              setStepForm((prev) => ({
                ...prev,
                date: event.target.value,
              }))
            }
          />
          <StyledInput
            type="number"
            placeholder="Введите дистанцию"
            value={stepForm.distance}
            onChange={(event) =>
              setStepForm((prev) => ({
                ...prev,
                distance: event.target.value,
              }))
            }
          />
          <StyledButton type="submit">Ок</StyledButton>
        </StyledForm>

        <StyledStepsWrapper>
          <StyledColumns>
            {HEADERS_MOCK.map((header) => {
              const { id, title } = header;

              return <StyledTableValue key={id}>{title}</StyledTableValue>;
            })}
          </StyledColumns>

          {steps.length > 0 ? (
            steps.map((step) => {
              const { id, date, distance } = step;

              return (
                <StyledColumns key={id}>
                  <StyledTableValue>
                    {date.toLocaleDateString("ru-RU")}
                  </StyledTableValue>
                  <StyledTableValue>{distance}</StyledTableValue>
                  <StyledButton onClick={() => handleDeleteStepButtonClick(id)}>
                    Удалить
                  </StyledButton>
                </StyledColumns>
              );
            })
          ) : (
            <StyledPlaceholder>Таблица пуста</StyledPlaceholder>
          )}
        </StyledStepsWrapper>
      </StyledContent>
    </StyledPageSteps>
  );
};

export { PageSteps };

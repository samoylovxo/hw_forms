import { useState } from "react";
import InputMask from "react-input-mask";
import styled from "styled-components";

const StyledPageHex = styled.div`
  height: 100vh;

  display: grid;
  justify-content: center;
  align-items: center;

  background-color: ${({ hexBackgroundColor }) => `#${hexBackgroundColor}`};

  transition: background-color 0.4s;
`;

const StyledContent = styled.div`
  width: 300px;

  display: grid;
  gap: 24px;
`;

const StyledInput = styled.input`
  padding: 8px 16px;
  width: 100%;

  border: 1px solid #e2e2e2;

  outline: none;
  transition: border-color 0.4s;

  font-size: 16px;
  line-height: 20px;
  text-align: center;

  &:focus {
    border-color: #b5b5b5;
  }
`;

const PageHex = () => {
  const [hexValue, setHexValue] = useState("");
  const [rgbValue, setRgbValue] = useState("");
  const [showError, setShowError] = useState(false);

  const showResult = showError || Boolean(rgbValue);

  const handleHexChange = (value) => {
    const tempValue = value.replace(/^#/g, "");

    setHexValue(tempValue);

    if (tempValue === "") {
      setRgbValue("");
      setShowError(false);
    }
    if (tempValue.length !== 6) return;

    const rgb = tempValue.match(/.{1,2}/g);
    const rgbValue = [
      parseInt(rgb[0], 16),
      parseInt(rgb[1], 16),
      parseInt(rgb[2], 16),
    ];

    const isSuccess = rgbValue.every(
      (val) => typeof val === "number" && !isNaN(val)
    );

    isSuccess ? setRgbValue(rgbValue.join(", ")) : setShowError(true);
  };

  return (
    <StyledPageHex hexBackgroundColor={hexValue}>
      <StyledContent>
        <StyledInput
          as={InputMask}
          mask="#******"
          maskChar={null}
          value={hexValue}
          onChange={(event) => handleHexChange(event.target.value)}
        />
        <StyledInput
          value={showResult ? (showError ? "Ошибка" : `rgb(${rgbValue})`) : ""}
          placeholder="HEX to RGB"
          readOnly={true}
        />
      </StyledContent>
    </StyledPageHex>
  );
};

export { PageHex };

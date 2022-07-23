import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledPageHome = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 20px;
`;

const StyledLink = styled.div`
  padding: 8px 16px;
  border: 1px solid #000;

  text-decoration: none;

  color: #000000;
`;

const PageHome = () => {
  return (
    <StyledPageHome>
      <StyledLink as={Link} to="/hex2rgb">
        HW Hex
      </StyledLink>
      <StyledLink as={Link} to="/steps">
        HW Steps
      </StyledLink>
    </StyledPageHome>
  );
};

export { PageHome };

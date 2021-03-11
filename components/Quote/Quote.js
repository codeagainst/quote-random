import styled from "styled-components";

const StyledQuote = styled.div`
  border-left: 5px solid var(--yellow);
  padding-left: 100px;
  max-width: 50%;
  font-size: 36px;
  font-weight: 500;
  line-height: 40px;
  margin: 70px 0;
  display: flex;
  justify-content: center;
`;

const Quote = ({ quoteText }) => {
  return <StyledQuote>{`"${quoteText}"`}</StyledQuote>;
};
export default Quote;
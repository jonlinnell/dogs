import styled from 'styled-components';

const SectionTitle = styled.h4`
  font-size: 1.5rem;
  text-transform: capitalize;
  font-weight: 300;
  margin-top: ${({ noMarginTop }) => (noMarginTop ? 0 : '1.33em')};
  margin-bottom: ${({ noMarginBottom }) => (noMarginBottom ? 0 : '1.33em')};
`;

export default SectionTitle;

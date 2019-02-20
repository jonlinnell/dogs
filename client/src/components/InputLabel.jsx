import styled from 'styled-components';

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  margin-bottom: 24px;

  background: none;
  color: ${({ theme: { colours } }) => colours.dark};
`;

export default InputLabel;

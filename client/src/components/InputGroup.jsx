import styled from 'styled-components';

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  background: none;
  color: ${({ theme: { colours } }) => colours.primary};
`;

export default InputLabel;

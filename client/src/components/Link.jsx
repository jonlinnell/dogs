import styled from 'styled-components';

const Link = styled.a`
  color: ${({ theme: { colours } }) => colours.primary};
`;

export default Link;

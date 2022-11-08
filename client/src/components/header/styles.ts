import styled from 'styled-components';
import { secondColor, secondFontColor } from '../../styles';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid ${secondColor};
  padding: 6px 12px;
`;

export const HeaderLogotype = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: ${secondFontColor};
  text-transform: uppercase;
`;
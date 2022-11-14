import styled from 'styled-components'
import { primaryFontColor } from '../../styles';

export const DropdownContainer = styled.div`
  position: absolute;
  top: 20px;
  width: 100%;
  margin: 22px auto;
  z-index: 1;
`;

export const DropdownItemsContainer = styled.div<{ open: boolean }>`
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  margin-top: 4px;
  max-height: ${(props) => props.open ? '200px' : '0'};
  overflow: hidden;
  transition: all .3s ease-in-out;
  background: #FFFFFF;
`;

export const DropdownItemsList = styled.ul`
  list-style: none;
  height: 200px;
  overflow: auto;
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  cursor: pointer;

  :hover {
    background-color: #ececec;
  }
`;

export const DropdownItemText = styled.p`
  font-size: 14px;
  color: ${primaryFontColor};
  font-weight: 800;
`;

export const DropdownItemCheckbox = styled.input.attrs({ type: 'checkbox'})``;
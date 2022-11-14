import styled from 'styled-components'
import { fourthFontColor, secondFontColor, thirdColor } from '../../styles';

export const SectionSearch = styled.section`
  position: relative;
`;

export const CardContainer = styled.div`
  margin: 22px;
  padding: 26px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 30px;
`

export const CardHeader = styled.div`
  margin-bottom: 26px;
  border-bottom: 1px solid ${fourthFontColor};
`

export const CardTitle = styled.h2`
  text-align: center;
  color: ${secondFontColor};
`
export const CardBody = styled.div`
`

export const CardForm = styled.form`
  width: 100%;
  margin: 0 auto;
`

export const CardFormInputs = styled.div`
  display: flex;
  justify-content: space-between;
`

export const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 22px 0 42px;
`

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  color: ${thirdColor};
  font-size: 14px;
  border: 0;
  background-color: #FFFFFF;
  cursor: pointer;

  svg {
    margin-right: 6px;
  }
`

export const SearchButton = styled.button<{disabled: boolean}>`
  display: block;
  color: #FFFFFF;
  background-color: ${thirdColor};
  border: 0;
  border-radius: 6px;
  margin: 0 auto;
  padding: 12px 52px;
  cursor: pointer;
  transition: all .2s ease-in-out;

  :disabled {
    opacity: 0.3;
  }

  :hover {
    background-color: ${({disabled}) => disabled ? thirdColor : '#4a77ed'};
  }
`

export const MoreInputContainer = styled.div`
  width: fit-content;
`

export const IntermediateCityContainer = styled.div`
  display: flex;
  align-items: center;
`

export const RemoveButton = styled.button`
  border: 0;
  background-color: #FFF;
  margin: 24px 12px 0;
  cursor: pointer;
`

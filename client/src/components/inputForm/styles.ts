import styled from 'styled-components'
import { fourthFontColor } from '../../styles'

export const FormInputContainer = styled.div`
  position: relative;
  margin: 24px 0 0;

  svg {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
`

export const FormInputLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 46px;
  transform: translateY(-50%);
  font-size: 16px;
  color: ${fourthFontColor};
  font-weight: 600;
  transition: all .3s ease-in-out;
  pointer-events: none;
`

export const FormInput = styled.input<{ hasValue: boolean, errorMessage: string }>`
  position: relative;
  width: 250px;
  padding: 12px 12px 12px 46px;
  border: ${({errorMessage}) => errorMessage ? '2px solid red' : '1px solid #c0c0c0'};
  border-radius: 6px;

  :focus ~ label {
    top: -14px;
    left: 6px;
    font-size: 12px;
  }

  ${({hasValue}) => hasValue ? "~ label {top: -14px; left: 6px; font-size: 12px;}" : ""}
`

export const DatePickerContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;

  input {
    width: 100%;
    height: 40px;
    opacity: 0;
  }
`

export const ErrorMessageElement = styled.p`
  display: block;
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 12px;
  color: red;
`
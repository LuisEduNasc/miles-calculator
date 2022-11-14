import React, { ChangeEventHandler, useImperativeHandle } from 'react'
import { useDebounce } from 'use-debounce'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { DropdownComponent } from '../dropdown'
import {
  DatePickerContainer,
  ErrorMessageElement,
  FormInput,
  FormInputContainer,
  FormInputLabel,
} from './styles'
import { SearchFormContext } from '../../contexts/home'
import { format } from 'date-fns'

export const InputForm: React.FC<{
  type: string
  name: string
  label: string
  icon: any
  value: any
  onChangeFunc: ChangeEventHandler<HTMLInputElement> | undefined
  dropdownType?: string
  errorMessage: string
}> = ({
  type,
  name,
  label,
  icon,
  value,
  onChangeFunc,
  dropdownType,
  errorMessage,
}) => {
  const [hasFocus, setHasFocus] = React.useState<boolean>(false)

  const inputRef = React.useRef<HTMLInputElement>(null)

  const [searchValueDebounced] = useDebounce(value, 500)

  const formContext = React.useContext(SearchFormContext)

  const renderInputComplement = () => {
    switch (dropdownType) {
      case 'cities':
        return searchValueDebounced ? (
          <DropdownComponent
            active={hasFocus}
            searchValue={searchValueDebounced}
            name={name}
          />
        ) : null
      case 'date':
        let newDate: Date | undefined = undefined
        if (typeof formContext.searchForm.date === 'string') {
          newDate = new Date()
        } else {
          newDate = formContext.searchForm.date
        }

        return (
          <DatePickerContainer>
            <DatePicker
              selected={newDate}
              onChange={(date: Date) => {
                formContext.setSearchForm({
                  ...formContext.searchForm,
                  date: date,
                })
                inputRef.current!.value = format(date, 'yyyy-MM-dd')
              }}
              startDate={new Date()}
            />
          </DatePickerContainer>
        )
      default:
        break
    }
  }

  return (
    <FormInputContainer>
      <FormInput
        ref={inputRef}
        type={type}
        name={name}
        id={name}
        hasValue={!!value}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        value={value}
        onChange={onChangeFunc}
        errorMessage={errorMessage}
      />
      <FormInputLabel>{label}</FormInputLabel>
      {icon}

      {renderInputComplement()}

      <ErrorMessageElement>{errorMessage}</ErrorMessageElement>
    </FormInputContainer>
  )
}

import React from 'react'
import {
  FaMapMarkerAlt,
  FaCalendarDay,
  FaMale,
  FaPlus,
  FaTrash,
} from 'react-icons/fa'
import { format, isFuture } from 'date-fns'
import { parseUrl } from 'query-string'

import { InputForm } from '../../components/inputForm'
import { IIntermediateCity, SearchFormContext } from '../../contexts/home'
import {
  AddButton,
  AddButtonContainer,
  CardBody,
  CardContainer,
  CardForm,
  CardFormInputs,
  CardHeader,
  CardTitle,
  IntermediateCityContainer,
  MoreInputContainer,
  RemoveButton,
  SearchButton,
  SectionSearch,
} from './styles'
import { useNavigate } from 'react-router-dom'

export const Home: React.FC = () => {
  const [extraFields, setExtraFields] = React.useState<Array<number>>([])
  const [extraFieldLastId, setExtraFieldLastId] = React.useState<number>(1)
  const [canSubmitForm, setCanSubmitForm] = React.useState<boolean>(true)

  const formContext = React.useContext(SearchFormContext)

  const queryParams = parseUrl(window.location.search)
  const navigate = useNavigate()

  const handleAddNewFormField = (): void => {
    setExtraFields([...extraFields, extraFieldLastId])

    const newIntermediateCities =
      formContext?.searchForm.intermediateCities.set(extraFieldLastId, {
        value: '',
        errorMessage: '',
      })

    formContext?.setSearchForm({
      ...formContext.searchForm,
      intermediateCities: newIntermediateCities,
    })
    setExtraFieldLastId((id) => ++id)
  }

  const handleFormDataChange = ({
    keyForm,
    extraFieldId,
    value,
  }: {
    keyForm: string
    extraFieldId?: number
    value: string
  }): void => {
    setCanSubmitForm(true)
    if (keyForm !== 'intermediateCities') {
      formContext.setSearchForm({
        ...formContext.searchForm,
        [keyForm]: value,
        [keyForm + 'ErrorMessage']: '',
      })
    } else if (extraFieldId) {
      const newIntermediateCities =
        formContext.searchForm.intermediateCities.set(extraFieldId, {
          value: value,
          errorMessage: '',
        })
      formContext.setSearchForm({
        ...formContext.searchForm,
        intermediateCities: newIntermediateCities,
      })
    }
  }

  const handleRemoveExtraField = (extraFieldId: number) => {
    const tempExtraFields = [...extraFields]
    tempExtraFields.splice(extraFields.indexOf(extraFieldId), 1)
    setExtraFields(tempExtraFields)

    formContext.searchForm.intermediateCities.delete(extraFieldId)
  }

  const validateFields = (): boolean => {
    let hasError = false

    if (
      /\d/.test(formContext.searchForm.origin) ||
      !formContext.searchForm.origin
    ) {
      hasError = true

      formContext.setSearchForm({
        ...formContext.searchForm,
        originErrorMessage: 'Select a city name from the list.',
      })
    }

    if (
      /\d/.test(formContext.searchForm.destination) ||
      !formContext.searchForm.destination
    ) {
      hasError = true

      formContext.setSearchForm({
        ...formContext.searchForm,
        destinationErrorMessage: 'Select a city name from the list.',
      })
    }

    if (
      !formContext.searchForm.date ||
      !isFuture(new Date(formContext.searchForm.date))
    ) {
      hasError = true

      formContext.setSearchForm({
        ...formContext.searchForm,
        dateErrorMessage: 'Select a date in the future.',
      })
    }

    if (
      !formContext.searchForm.passengers ||
      formContext.searchForm.passengers < 1
    ) {
      hasError = true

      formContext.setSearchForm({
        ...formContext.searchForm,
        passengersErrorMessage: 'Inform the quantity of people.',
      })
    }

    formContext.searchForm.intermediateCities.forEach((city, key) => {
      if (!city.value || /\d/.test(city.value)) {
        const newIntermediateCities =
          formContext.searchForm.intermediateCities.set(key, {
            value: city.value,
            errorMessage: 'Select a city name from the list.',
          })
        formContext.setSearchForm({
          ...formContext.searchForm,
          intermediateCities: newIntermediateCities,
        })
      }
    })

    if (hasError) setCanSubmitForm(false)
    return hasError
  }

  const handleFormSubmit = () => {
    if (!validateFields()) {
      let intermediateCitiesSearch = ''
      formContext.searchForm.intermediateCities?.forEach((city) => {
        intermediateCitiesSearch += `&intermediateCities=${city.value}`
      })

      navigate({
        pathname: '/results',
        search: `?origin=${formContext.searchForm.origin}&destination=${
          formContext.searchForm.destination
        }&date=${
          formContext.searchForm.date &&
          format(new Date(formContext.searchForm.date), 'yyyy-MM-dd')
        }&passengers=${
          formContext.searchForm.passengers
        }${intermediateCitiesSearch}`,
      })
    }
  }

  const setContextFromURL = () => {
    const intermediateCitiesSearch = queryParams.query.intermediateCities

    let intermediateCities: Array<string> = []
    if (intermediateCitiesSearch?.length) {
      intermediateCities = JSON.stringify(intermediateCitiesSearch)
        .replace(/[\[\]\"']+/g, '')
        .split(',')
    }

    const newIntermediateCitiesSet: Map<number, IIntermediateCity> = new Map()
    const fieldArray = []
    for (let idx = 0; idx < intermediateCities.length; idx++) {
      newIntermediateCitiesSet.set(idx, {
        value: intermediateCities[idx],
        errorMessage: '',
      })
      fieldArray.push(idx)
    }
    setExtraFields(fieldArray)
    setExtraFieldLastId(intermediateCities.length)

    formContext.setSearchForm({
      ...formContext.searchForm,
      origin: queryParams.query.origin?.toString() || '',
      destination: queryParams.query.destination?.toString() || '',
      date: queryParams.query.date?.toString() || '',
      passengers: Number(queryParams.query.passengers) || 0,
      intermediateCities: newIntermediateCitiesSet,
    })
  }

  React.useEffect(() => {
    setContextFromURL()
  }, [])

  return (
    <SectionSearch>
      <CardContainer>
        <CardHeader>
          <CardTitle>Trip</CardTitle>
        </CardHeader>
        <CardBody>
          <CardForm>
            <CardFormInputs>
              <InputForm
                type='text'
                name='origin'
                label='City of origin'
                icon={<FaMapMarkerAlt size={24} />}
                value={formContext.searchForm.origin}
                onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFormDataChange({
                    keyForm: 'origin',
                    value: e.target.value,
                  })
                }
                dropdownType='cities'
                errorMessage={formContext.searchForm.originErrorMessage}
              />

              <InputForm
                type='text'
                name='destination'
                label='City of destination'
                icon={<FaMapMarkerAlt size={24} />}
                value={formContext.searchForm.destination}
                onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFormDataChange({
                    keyForm: 'destination',
                    value: e.target.value,
                  })
                }
                dropdownType='cities'
                errorMessage={formContext.searchForm.destinationErrorMessage}
              />

              <InputForm
                type='text'
                name='date'
                label='Date of the trip'
                icon={<FaCalendarDay size={24} />}
                value={
                  formContext.searchForm.date &&
                  format(new Date(formContext.searchForm.date), 'yyyy-MM-dd')
                }
                onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFormDataChange({
                    keyForm: 'date',
                    value: e.target.value,
                  })
                }
                dropdownType='date'
                errorMessage={formContext.searchForm.dateErrorMessage}
              />

              <InputForm
                type='number'
                name='passengers'
                label='Number of passengers'
                icon={<FaMale size={24} />}
                value={formContext.searchForm.passengers}
                onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFormDataChange({
                    keyForm: 'passengers',
                    value: e.target.value,
                  })
                }
                errorMessage={formContext.searchForm.passengersErrorMessage}
              />
            </CardFormInputs>

            <MoreInputContainer>
              {extraFields.map((field) => (
                <IntermediateCityContainer key={field}>
                  <InputForm
                    type='text'
                    name={`intermediateCities-${field}`}
                    label='Intermediate city'
                    icon={<FaMapMarkerAlt size={24} />}
                    value={
                      formContext.searchForm.intermediateCities.get(field)
                        ?.value
                    }
                    onChangeFunc={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleFormDataChange({
                        keyForm: 'intermediateCities',
                        extraFieldId: field,
                        value: e.target.value,
                      })
                    }
                    dropdownType='cities'
                    errorMessage={
                      formContext.searchForm.intermediateCities.get(field)
                        ?.errorMessage || ''
                    }
                  />

                  <RemoveButton
                    type='button'
                    onClick={() => handleRemoveExtraField(field)}
                  >
                    <FaTrash size={18} />
                  </RemoveButton>
                </IntermediateCityContainer>
              ))}
            </MoreInputContainer>

            <AddButtonContainer>
              <AddButton type='button' onClick={handleAddNewFormField}>
                <FaPlus size={12} />
                Add intermediate city
              </AddButton>
            </AddButtonContainer>
            <SearchButton
              type='button'
              disabled={!canSubmitForm}
              onClick={handleFormSubmit}
            >
              Search
            </SearchButton>
          </CardForm>
        </CardBody>
      </CardContainer>
    </SectionSearch>
  )
}

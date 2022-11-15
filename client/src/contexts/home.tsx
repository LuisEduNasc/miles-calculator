import React from 'react'

export interface IIntermediateCity {
  value: string
  errorMessage: string
}

export interface IForm {
  origin: string
  originErrorMessage: string
  destination: string
  destinationErrorMessage: string
  date: Date | undefined | string
  dateErrorMessage: string
  passengers: number | undefined
  passengersErrorMessage: string
  intermediateCities: Map<number, IIntermediateCity>
}

export interface ISearchFormContext {
  searchForm: IForm
  setSearchForm: (formData: IForm) => void
}

export const SearchFormContext = React.createContext<ISearchFormContext>({
  searchForm: {
    origin: '',
    originErrorMessage: '',
    destination: '',
    destinationErrorMessage: '',
    date: '',
    dateErrorMessage: '',
    passengers: 0,
    passengersErrorMessage: '',
    intermediateCities: new Map(),
  },
  setSearchForm: () => {},
})

export const SearchFormProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [searchForm, setSearchForm] = React.useState<IForm>({
    origin: '',
    originErrorMessage: '',
    destination: '',
    destinationErrorMessage: '',
    date: '',
    dateErrorMessage: '',
    passengers: 0,
    passengersErrorMessage: '',
    intermediateCities: new Map(),
  })

  const providerObj: ISearchFormContext = {
    searchForm,
    setSearchForm,
  }

  return (
    <SearchFormContext.Provider value={providerObj}>
      {children}
    </SearchFormContext.Provider>
  )
}

import React from 'react'
import { useQuery } from 'react-query'
import { fetchCities, ICitiesResponse } from '../../api/cities'
import { SearchFormContext } from '../../contexts/home'

import {
  DropdownContainer,
  DropdownItem,
  DropdownItemsContainer,
  DropdownItemsList,
  DropdownItemText,
} from './style'

export const DropdownComponent: React.FC<{
  active: boolean
  searchValue: string
  name: string
}> = ({ active, searchValue, name }) => {
  const { isError, isSuccess, isLoading, data } = useQuery<
    ICitiesResponse,
    Error
  >(['cities', searchValue], () => fetchCities(searchValue))

  const formContext = React.useContext(SearchFormContext)

  const handleItemSelected = (city: string): void => {
    if (name.indexOf('intermediateCities') === -1) {
      formContext.setSearchForm({ ...formContext.searchForm, [name]: city })
    } else {
      const newIntermediateCities =
        formContext.searchForm.intermediateCities.set(
          Number(name.split('-')[1]),
          { value: city, errorMessage: '' }
        )
      formContext.setSearchForm({
        ...formContext.searchForm,
        intermediateCities: newIntermediateCities,
      })
    }
  }

  if (isLoading) {
    return (
      <DropdownContainer>
        <DropdownItemsContainer open={active}>
          <DropdownItemsList>
            <DropdownItem>
              <DropdownItemText>Loading items...</DropdownItemText>
            </DropdownItem>
          </DropdownItemsList>
        </DropdownItemsContainer>
      </DropdownContainer>
    )
  }

  if (isError) {
    return (
      <DropdownContainer>
        <DropdownItemsContainer open={active}>
          <DropdownItemsList>
            <DropdownItem>
              <DropdownItemText>
                Something went wrong, try again.
              </DropdownItemText>
            </DropdownItem>
          </DropdownItemsList>
        </DropdownItemsContainer>
      </DropdownContainer>
    )
  }

  return (
    <DropdownContainer>
      <DropdownItemsContainer open={active}>
        <DropdownItemsList>
          {isSuccess && data?.cities.length ? (
            data.cities.map((city: any) => (
              <DropdownItem
                key={city[0]}
                onClick={() => handleItemSelected(city[0])}
              >
                <DropdownItemText>{city[0]}</DropdownItemText>
              </DropdownItem>
            ))
          ) : (
            <DropdownItem>
              <DropdownItemText>No results found.</DropdownItemText>
            </DropdownItem>
          )}
        </DropdownItemsList>
      </DropdownItemsContainer>
    </DropdownContainer>
  )
}

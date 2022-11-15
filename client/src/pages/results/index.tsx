import React from 'react'
import { FaExclamationTriangle, FaCalculator } from 'react-icons/fa'
import { parseUrl } from 'query-string'

import {
  CalculationCityName,
  CalculationItem,
  CalculationKilometers,
  CalculationResultsContainer,
  CenterInfo,
  CenterInfoItem,
  CenterInfoTitle,
  EmptyInfoMessage,
  EmptyInfoMessageContainer,
  GoBackToSearchButton,
  InfoItemTitle,
  InfoItemValue,
  ResultsPageContainer,
  SearchInfoContainer,
  TopRightCornerInfo,
  TopRightCornerItem,
} from './styles'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getKilometers, IKilometersResponse } from '../../api/cities'

export const ResultsPage: React.FC = () => {
  const queryParams = parseUrl(window.location.search)
  const navigate = useNavigate()

  const origin = queryParams.query.origin?.toString() || '',
    destination = queryParams.query.destination?.toString() || '',
    date = queryParams.query.date?.toString() || '',
    passengers = Number(queryParams.query.passengers) || 0,
    intermediateCitiesSearch = queryParams.query.intermediateCities

  let intermediateCities: Array<string> = []
  if (intermediateCitiesSearch?.length) {
    intermediateCities = JSON.stringify(intermediateCitiesSearch)
      .replace(/[\[\]\"']+/g, '')
      .split(',')
  }

  const requestSearch = [origin, ...intermediateCities, destination]
  const { isError, isSuccess, isLoading, data } = useQuery<
    IKilometersResponse[],
    Error
  >(['kilometers', requestSearch], () => getKilometers(requestSearch))

  if (!origin || !destination || !date || !passengers) {
    return (
      <ResultsPageContainer>
        <SearchInfoContainer>
          <EmptyInfoMessageContainer>
            <FaExclamationTriangle size={42} />
            <EmptyInfoMessage>
              Looks like we don't have the information necessary for the
              calculation.
            </EmptyInfoMessage>
          </EmptyInfoMessageContainer>
          <GoBackToSearchButton onClick={() => navigate('/')}>
            Go Back to search
          </GoBackToSearchButton>
        </SearchInfoContainer>
      </ResultsPageContainer>
    )
  }

  return (
    <ResultsPageContainer>
      <SearchInfoContainer>
        <TopRightCornerInfo>
          <TopRightCornerItem>
            <InfoItemTitle>Date</InfoItemTitle>
            <InfoItemValue>{date}</InfoItemValue>
          </TopRightCornerItem>
          <TopRightCornerItem>
            <InfoItemTitle>Passengers</InfoItemTitle>
            <InfoItemValue>{passengers}</InfoItemValue>
          </TopRightCornerItem>
        </TopRightCornerInfo>

        <CenterInfoTitle>Route</CenterInfoTitle>

        <CenterInfo>
          <CenterInfoItem>
            <InfoItemTitle>Origin</InfoItemTitle>
            <InfoItemValue>{origin}</InfoItemValue>
          </CenterInfoItem>

          {intermediateCities.length
            ? intermediateCities.map((city: string, idx) => (
                <CenterInfoItem key={idx}>
                  <InfoItemTitle>Intermediate City</InfoItemTitle>
                  <InfoItemValue>{city}</InfoItemValue>
                </CenterInfoItem>
              ))
            : null}

          <CenterInfoItem>
            <InfoItemTitle>Destination</InfoItemTitle>
            <InfoItemValue>{destination}</InfoItemValue>
          </CenterInfoItem>
        </CenterInfo>
      </SearchInfoContainer>

      <CalculationResultsContainer>
        {isLoading ? (
          <EmptyInfoMessageContainer>
            <FaCalculator size={42} />
            <EmptyInfoMessage>Calculating...</EmptyInfoMessage>
          </EmptyInfoMessageContainer>
        ) : !isError && isSuccess ? (
          data?.map(({ id, origin, destiny, kilometers }) => {
            return (
              <CalculationItem key={id}>
                <CalculationCityName>{origin}</CalculationCityName>
                <CalculationKilometers>
                  {' '}
                  -- {kilometers} km --
                </CalculationKilometers>
                <CalculationCityName>{destiny}</CalculationCityName>
              </CalculationItem>
            )
          })
        ) : (
          <EmptyInfoMessageContainer>
            <FaExclamationTriangle size={42} />
            <EmptyInfoMessage>
              A error occurred in the calculation.
            </EmptyInfoMessage>
          </EmptyInfoMessageContainer>
        )}

        <GoBackToSearchButton onClick={() => navigate('/')}>
          New Search
        </GoBackToSearchButton>
      </CalculationResultsContainer>
    </ResultsPageContainer>
  )
}

import styled from 'styled-components'
import { fourthFontColor, primaryColor, primaryFontColor, secondFontColor, thirdColor } from '../../styles'

export const ResultsPageContainer = styled.div`
  position: relative;
`

export const SearchInfoContainer = styled.div`
  margin: 22px;
  padding: 26px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 30px;
`
export const EmptyInfoMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const EmptyInfoMessage = styled.p`
  font-size: 26px;
  color: ${secondFontColor};
  font-weight: 600;
  text-align: center;
  margin: 22px auto 56px;
`

export const GoBackToSearchButton = styled.button`
  display: block;
  color: #FFFFFF;
  background-color: ${thirdColor};
  border: 0;
  border-radius: 6px;
  margin: 32px auto 0;
  padding: 12px 52px;
  cursor: pointer;
  transition: all .2s ease-in-out;

  :hover {
    background-color: ${({disabled}) => disabled ? thirdColor : '#4a77ed'};
  }
`

export const TopRightCornerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const TopRightCornerItem = styled.div`
  margin-left: 26px;
`

export const InfoItemTitle = styled.p`
  font-size: 12px;
  color: ${fourthFontColor};
`

export const InfoItemValue = styled.p`
  font-size: 16px;
  color: ${primaryFontColor};
  font-weight: 600;
`

export const CenterInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
`

export const CenterInfoTitle = styled.p`
  font-size: 32px;
  color: ${secondFontColor};
  font-weight: 600;
  text-align: center;
`

export const CenterInfoItem = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 6px 22px;
  margin-right: 12px;
`

export const CalculationResultsContainer = styled(SearchInfoContainer)``

export const CalculationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const CalculationCityName = styled(CenterInfoTitle)`
  min-width: 200px;
`

export const CalculationKilometers = styled.p`
  font-size: 24px;
  color: ${primaryColor};
  margin: 0 32px;
`

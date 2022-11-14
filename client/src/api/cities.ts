import axios from 'axios'

export interface ICitiesResponse {
  cities: Array<[string, number, number]>
}

const sleep = (ms: number): Promise<any> => {
  return new Promise((resolve) => {setTimeout(resolve, ms)})
}

export const fetchCities = async (search: string): Promise<ICitiesResponse> => {
  const response = await axios({
    url: `http://localhost:8000/api/v1/cities/?q=${search}`,
    method: 'get',
  }).then(await sleep(2000))
  const cities = response.data

  return cities
}
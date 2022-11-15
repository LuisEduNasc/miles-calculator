import axios from 'axios'

export interface ICitiesResponse {
  cities: Array<[string, number, number]>
}

export interface IKilometersResponse {
  id: number;
  origin: string;
  destiny: string;
  kilometers: string;
}

const sleep = (ms: number): Promise<any> => {
  return new Promise((resolve) => {setTimeout(resolve, ms)})
}

export const fetchCities = async (search: string): Promise<ICitiesResponse> => {
  const response = await axios({
    url: `${process.env.REACT_APP_URL_CITIES}/api/v1/cities/?q=${search}`,
    method: 'get',
  }).then(await sleep(1500))

  return response.data as ICitiesResponse
}

export const getKilometers = async (search: Array<string>): Promise<IKilometersResponse[]> => {
  const response = await axios({
    url: `${process.env.REACT_APP_URL_CITIES}/api/v1/kilometers/?q=${search}`,
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(await sleep(1500))

  return response.data as IKilometersResponse[]
}
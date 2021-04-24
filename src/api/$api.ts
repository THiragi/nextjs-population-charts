/* eslint-disable */
// prettier-ignore
import { AspidaClient, dataToURLString } from 'aspida'
// prettier-ignore
import { Methods as Methods0 } from './v1/population/composition/perYear'
// prettier-ignore
import { Methods as Methods1 } from './v1/prefectures'

// prettier-ignore
const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '')
  const PATH0 = '/v1/population/composition/perYear'
  const PATH1 = '/v1/prefectures'
  const GET = 'GET'

  return {
    v1: {
      population: {
        composition: {
          perYear: {
            get: (option: { query: Methods0['get']['query'], config?: T }) =>
              fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json(),
            $get: (option: { query: Methods0['get']['query'], config?: T }) =>
              fetch<Methods0['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
            $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
              `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        }
      },
      prefectures: {
        get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json(),
        $get: (option?: { config?: T }) =>
          fetch<Methods1['get']['resBody']>(prefix, PATH1, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`
      }
    }
  }
}

// prettier-ignore
export type ApiInstance = ReturnType<typeof api>
// prettier-ignore
export default api

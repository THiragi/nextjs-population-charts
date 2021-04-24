import {
  PopulationResponse,
  GetPopulationQuery,
} from '../../../../../types/api';

export type Methods = {
  get: {
    query: GetPopulationQuery;
    resBody: PopulationResponse;
  };
};

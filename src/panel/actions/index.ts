import { actions as a } from "../constants";

export const setAppData = (data: AppDataService) => {
  return {
    payload: data,
    type: a.sync.SET_APPDATA,
  };
};

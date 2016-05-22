// import { combineReducers } from "redux"; // wtf not fit in ng-redux

const initState = {
  status: "ready",
};

const flow = (state = initState, action) => {
  return {
    status: state.status,
  };
};

const section = (state = 0, action) => {
  return {
    status: 0,
  };
};

const reducers = {
  flow,
  section,
};

export default reducers;

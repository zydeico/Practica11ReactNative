import * as types from "./types";
import { AsyncStorage } from "react-native";

function setFetching(value) {
  return {
    type: types.HEROES_SET_FETCHING,
    value: value
  };
}

export function setList(value) {
  return {
    type: types.HEROES_UPDATE_LIST,
    value
  };
}

export function setItem(value) {
  return {
    type: types.HEROES_SET_ITEM,
    value
  };
}

export function fetchHeroesList() {
  return (dispatch, getState, api) => {
    AsyncStorage.getItem("heroesList", (error, result) => {
      if (result && !error) {
        const heroesList = JSON.parse(result);
        dispatch(setList(heroesList));
      } else {
        dispatch(setFetching(true));
      }
    });

    api
      .fetchHeroes()
      .then(res => {
        dispatch(setFetching(false));
        dispatch(setList(res.data.data.results));
        AsyncStorage.setItem(
          "heroesList",
          JSON.stringify(res.data.data.results)
        );
      })
      .catch(err => {
        dispatch(setFetching(false));
        console.log("fetchHeroesList error: ", err);
      });
  };
}

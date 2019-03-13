import * as actionTypes from "./actionTypes";
import { resetErrors } from "./errors";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const fetchAuthors = () => {
  return async dispatch => {
    try {
      const res = await instance.get("/api/authors/");
      const authors = res.data;
      dispatch({ type: actionTypes.FETCH_AUTHORS, payload: authors });
    } catch (err) {
      console.error(err);
    }
  };
};

export const filterAuthors = query => {
  return {
    type: actionTypes.FILTER_AUTHORS,
    payload: query
  };
};

//POST THE AUTHOR TO https://the-index-api.herokuapp.com/api/authors/
export const postAuthor = (newAuthor, closeModal) => {
  return async dispatch => {
    try {
      const res = await instance.post("/api/authors/", newAuthor);
      const author = res.data;
      dispatch(resetErrors());
      dispatch({
        type: actionTypes.POST_AUTHOR,
        payload: author
      });
      dispatch(filterAuthors(""));
      closeModal();
    } catch (err) {
      console.log(err.response.data)
      console.log(Object.keys(err.response.data))
      console.log(Object.keys(err.response.data).map(
        key => `${key}: ${err.response.data[key]}`
      ))
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

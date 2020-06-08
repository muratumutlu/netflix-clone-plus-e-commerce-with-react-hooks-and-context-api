import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

import axios from "axios";

import ApiUrl from "../constants/ApiUrl";
import Config from "../constants/Config";

const initialState = {
  trendingPerson: [{}],
  trendingMovies: [{}],
  trendingTVShows: [{}],
  similarMovies: [{}],
  similarTVShows: [{}],
  currentGenres: [{}],
  currentMovie: {},
  currentTVShow: {},
  movieCart: [],
  tvshowCart: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const fetchTrendingPerson = async () => {
    const res = await axios
      .get(
        `${ApiUrl.BASE + ApiUrl.TRENDING}/person/week?api_key=${Config.API_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "FETCH_TRENDING_PERSON",
          payload: res.data.results,
        });
      });
  };

  const fetchTrendingMovies = async () => {
    const res = await axios
      .get(
        `${ApiUrl.BASE + ApiUrl.TRENDING}/movie/week?api_key=${Config.API_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "FETCH_TRENDING_MOVIES",
          payload: res.data.results,
        });
      });
  };

  const fetchTrendingTVShows = async () => {
    const res = await axios
      .get(`${ApiUrl.BASE + ApiUrl.TRENDING}/tv/week?api_key=${Config.API_KEY}`)
      .then((res) => {
        dispatch({
          type: "FETCH_TRENDING_TVSHOWS",
          payload: res.data.results,
        });
      });
  };

  const getSimilarMovies = async (id) => {
    const res = await axios
      .get(`${ApiUrl.BASE}/movie/${id}/similar?api_key=${Config.API_KEY}`)
      .then((res) => {
        dispatch({
          type: "GET_SIMILAR_MOVIES",
          payload: res.data.results,
        });
      });
  };

  const getSimilarTVShows = async (id) => {
    const res = await axios
      .get(`${ApiUrl.BASE}/tv/${id}/similar?api_key=${Config.API_KEY}`)
      .then((res) => {
        dispatch({
          type: "GET_SIMILAR_TVSHOWS",
          payload: res.data.results,
        });
      });
  };

  const getCurrentMovie = async (id) => {
    const res = await axios
      .get(`${ApiUrl.BASE}/movie/${id}?api_key=${Config.API_KEY}`)
      .then((res) => {
        dispatch({
          type: "GET_CURRENT_MOVIE",
          payload: res.data,
        });
      });
  };

  const getCurrentTVShow = async (id) => {
    const res = await axios
      .get(`${ApiUrl.BASE}/tv/${id}?api_key=${Config.API_KEY}`)
      .then((res) => {
        dispatch({
          type: "GET_CURRENT_TVSHOW",
          payload: res.data,
        });
      });
  };

  const getCurrentGenres = async (id) => {
    const res = await axios
      .get(`${ApiUrl.BASE}/movie/${id}?api_key=${Config.API_KEY}`)
      .then((res) => {
        dispatch({
          type: "GET_CURRENT_GENRES",
          payload: res.data.genres,
        });
      });
  };

  function addToMovieCart(item) {
    console.log(item);
    dispatch({
      type: "ADD_TO_MOVIE_CART",
      payload: item,
    });
  }

  function addToTVShowCart(item) {
    console.log(item);
    dispatch({
      type: "ADD_TO_TVSHOW_CART",
      payload: item,
    });
  }

  function removeFromMovieCart(id) {
    dispatch({
      type: "REMOVE_FROM_MOVIE_CART",
      payload: id,
    });
  }

  function removeFromTVShowCart(id) {
    dispatch({
      type: "REMOVE_FROM_TV_SHOW_CART",
      payload: id,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        tvshowCart: state.tvshowCart,
        movieCart: state.movieCart,
        trendingMovies: state.trendingMovies,
        trendingTVShows: state.trendingTVShows,
        trendingPerson: state.trendingPerson,
        similarMovies: state.similarMovies,
        similarTVShows: state.similarTVShows,
        currentMovie: state.currentMovie,
        currentTVShow: state.currentTVShow,
        currentGenres: state.currentGenres,
        getCurrentMovie,
        getCurrentTVShow,
        getCurrentGenres,
        getSimilarMovies,
        getSimilarTVShows,
        fetchTrendingMovies,
        fetchTrendingTVShows,
        fetchTrendingPerson,
        removeFromTVShowCart,
        removeFromMovieCart,
        addToMovieCart,
        addToTVShowCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

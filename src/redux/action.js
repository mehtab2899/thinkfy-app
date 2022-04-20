import axios from "axios";

import {
  EMAIL_BODY_FAIL,
  EMAIL_BODY_REQUEST,
  EMAIL_BODY_SUCCESS,
  EMAIL_LIST_FAIL,
  EMAIL_LIST_REQUEST,
  EMAIL_LIST_SUCCESS,
} from "./constant";

export const listEmails = () => async (dispatch) => {
  try {
    dispatch({
      type: EMAIL_LIST_REQUEST,
    });

    const { data } = await axios.get(`https://flipkart-email-mock.now.sh/`);

    let d = {
      favorite: false,
      unread: true,
    };

    let totalData = data.list.map((res) => {
      let result = {
        res,
        d,
      };
      return result;
    });

    dispatch({
      type: EMAIL_LIST_SUCCESS,
      payload: totalData,
    });
  } catch (error) {
    dispatch({
      type: EMAIL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const emailsBodyList = (id) => async (dispatch) => {
  try {
    dispatch({
      type: EMAIL_BODY_REQUEST,
    });

    const { data } = await axios.get(
      `https://flipkart-email-mock.now.sh/?id=${id}`
    );

    console.log(data);

    let d = {
      favorite: false,
      unread: false,
      read: true,
    };

    let totalData = {
      data,
      d,
    };

    dispatch({
      type: EMAIL_BODY_SUCCESS,
      payload: totalData,
    });
  } catch (error) {
    dispatch({
      type: EMAIL_BODY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

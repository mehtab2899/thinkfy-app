import {
  EMAIL_BODY_FAIL,
  EMAIL_BODY_REQUEST,
  EMAIL_BODY_RESET,
  EMAIL_BODY_SUCCESS,
  EMAIL_LIST_FAIL,
  EMAIL_LIST_REQUEST,
  EMAIL_LIST_RESET,
  EMAIL_LIST_SUCCESS,
} from "./constant";

export const emailListReducer = (state = { email: [] }, action) => {
  switch (action.type) {
    case EMAIL_LIST_REQUEST:
      return { loading: true };
    case EMAIL_LIST_SUCCESS:
      return { loading: false, emails: action.payload };
    case EMAIL_LIST_FAIL:
      return { loading: false, error: action.payload };
    case EMAIL_LIST_RESET:
      return { emails: [] };
    default:
      return state;
  }
};

export const emailBodyReducer = (state = { emailBody: [] }, action) => {
  switch (action.type) {
    case EMAIL_BODY_REQUEST:
      return { loading: true };
    case EMAIL_BODY_SUCCESS:
      return { loading: false, emailsBody: action.payload };
    case EMAIL_BODY_FAIL:
      return { loading: false, error: action.payload };
    case EMAIL_BODY_RESET:
      return { emailsBody: [] };
    default:
      return state;
  }
};

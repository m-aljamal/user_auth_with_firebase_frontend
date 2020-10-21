import axios from "axios";

export const sendTokenToBackend = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/users/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCurrentUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/users/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
export const getCurrentAdmin = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/users/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

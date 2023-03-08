import * as api from "../api/index";

export const signIn = (formData, navigate, error) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)

    dispatch({ type: "AUTH", data })
    navigate("/");
  } catch (err) {
    error(err.response.data);
    console.log(err);
  }
};

export const signUp = (formData, navigate, error) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: "AUTH", data });

    navigate("/");
  } catch (err) {
   error(err.response.data);
    console.log(err.response.data);
  }
};

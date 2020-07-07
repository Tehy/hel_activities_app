import axios from "axios";
const baseUrl = "/api/login";

const login = async (userCredentials) => {
  try {
    //console.log("axios login() userCredentials", userCredentials);
    const response = await axios.post(baseUrl, userCredentials);
    //console.log("axios login() response.data", response.data);
    //console.log("response.status", response.status);

    return response;
  } catch (error) {
    //console.log("typeof error", typeof error);
    //console.log("services login error", { error });
    return error.response;
  }
};
export default login;

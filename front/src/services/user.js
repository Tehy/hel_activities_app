import axios from "axios";
const baseUrl = "/api/user";

const newUserCreate = async (userCredentials) => {
  try {
    console.log("axios newUserCreate()");
    console.log("axios userCredentials", userCredentials);
    const response = await axios.post(baseUrl, userCredentials);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("services newUserCreate error", error);
    return error;
  }
};
export default newUserCreate;

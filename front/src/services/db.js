import axios from "axios";
const baseUrl = "/db";

export const saveItem = async (id, username) => {
  try {
    const response = await axios.post(baseUrl, { id, username });
    //console.log("saveItem response", response);
    return response.status;
  } catch (error) {
    //console.log("db saveItem error", error);
  }
};
export const deleteItem = async (id, username) => {
  try {
    const response = axios.delete(baseUrl, { data: { id, username } });
    //console.log("deleteItem response", response);
    return response.data;
  } catch (error) {
    //console.log("db deleteItem error", error);
  }
};

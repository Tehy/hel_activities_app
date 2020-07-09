import axios from "axios";
const baseUrl = "/api/data";

export const getData = async () => {
  //console.log("axios getting data");
  const request = await axios.get(baseUrl);
  return request.data;
};
export const getDataId = async (id) => {
  //console.log("axios getDataId", id);
  const request = await axios.get(baseUrl + "/id/" + id);
  return request.data;
};
export const getDataTag = async (tag) => {
  //console.log("axios getDataTag", tag);
  const request = await axios.get(baseUrl + "/tag/" + tag);
  return request.data;
};

export const getDataRange = async (range) => {
  //console.log("axios getDataRange", range);
  const request = await axios.get(baseUrl + "/limit/" + range);
  return request.data;
};

export const getSavedItems = async (items) => {
  //console.log("getSavedItems items", items);
  const response = await axios.get(baseUrl + "/items/" + items);
  return response.data;
};

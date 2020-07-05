import axios from "axios";
const baseUrl = "/api/data";

export const getData = async () => {
  console.log("axios getting data");
  const request = await axios.get(baseUrl);
  //console.log("request.data", request.data);
  return request.data;
};
export const getDataId = async (id) => {
  console.log("axios getDataId", id);
  //console.log("Url ", baseUrl + "/" + id);
  const request = await axios.get(baseUrl + "/id/" + id);
  //console.log("request.data", request.data);
  console.log("GET DATAID done");

  return request.data;
};
export const getDataTag = async (tag) => {
  console.log("axios getDataTag", tag);
  //console.log("Url ", baseUrl + "/" + tag);
  const request = await axios.get(baseUrl + "/tag/" + tag);
  //console.log("request.data", request.data);
  console.log("GET DATATAG done");

  return request.data;
};

export const getDataRange = async (range) => {
  console.log("axios getDataRange", range);
  const request = await axios.get(baseUrl + "/limit/" + range);
  console.log("GET DATARANGE done");
  return request.data;
};

export const getSavedItems = async (items) => {
  try {
    console.log("getSavedItems items", items);
    const response = await axios.get(baseUrl + "/items/" + items);
    //console.log("response", response);
    console.log("response.data", response.data);
    //console.log("response", response);
    return response.data;
    //return null;
  } catch (error) {
    console.log("db getSavedItems error", error);
  }
};

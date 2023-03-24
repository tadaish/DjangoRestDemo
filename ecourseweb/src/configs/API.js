import axios from "axios";

export const endpoints = {
  categories: "/categories/",
  courses: "/courses/",
};

export default axios.create({
  baseURL: "http://httpthanhduong.pythonanywhere.com/",
});

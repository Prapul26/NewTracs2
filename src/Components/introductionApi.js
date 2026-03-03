import axios from "axios";

const API = "https://tracsdev.apttechsol.com/api";

const getToken = () => sessionStorage.getItem("authToken");

export const fetchProfileApi = () => {
  return axios.get(`${API}/my-profile`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const fetchIntroductionDataApi = () => {
  return axios.get(`${API}/sendmailintro/introduction_email`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const fetchContactsApi = () => {
  return axios.get(`${API}/getContactsEmails`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const fetchTracsMembersApi = () => {
  return axios.get(`${API}/getTracsMembers`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const addContactApi = (contactData) => {
  return axios.post(`${API}/contact_store_form`, contactData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
  });
};

export const sendIntroductionApi = (formData) => {
  return axios.post(`${API}/sendmailintrotointromem`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};
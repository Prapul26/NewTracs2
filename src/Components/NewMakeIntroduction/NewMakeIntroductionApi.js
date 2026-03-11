import axios from "axios";

const API_BASE = "https://tracsdev.apttechsol.com/api";

const getToken = () => sessionStorage.getItem("authToken");

export const fetchProfileApi = () => {
  return axios.get(`${API_BASE}/my-profile`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const fetchIntroductionEmailApi = () => {
  return axios.get(`${API_BASE}/sendmailintro/introduction_email`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const fetchContactsApi = () => {
  return axios.get(`${API_BASE}/getContactsEmails`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const fetchTracsMembersApi = () => {
  return axios.get(`${API_BASE}/getTracsMembers`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const saveContactApi = (contactData) => {
  return axios.post(
    `${API_BASE}/contact_store_form`,
    contactData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json"
      }
    }
  );
};

export const sendIntroductionApi = (formData) => {
  return axios.post(
    `${API_BASE}/sendmailintrotointromem`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
};
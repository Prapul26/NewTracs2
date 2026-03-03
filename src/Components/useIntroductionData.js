import { useEffect, useState } from "react";
import {
  fetchProfileApi,
  fetchIntroductionDataApi,
  fetchContactsApi,
  fetchTracsMembersApi,
} from "../api/introductionApi";

export default function useIntroductionData() {
  const [profile, setProfile] = useState({});
  const [data, setData] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [tracsMembers, setTracsMembers] = useState([]);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      const [profileRes, introRes, contactsRes, membersRes] =
        await Promise.all([
          fetchProfileApi(),
          fetchIntroductionDataApi(),
          fetchContactsApi(),
          fetchTracsMembersApi(),
        ]);

      setProfile(profileRes.data);
      setData(introRes.data);

      if (contactsRes.data.success) {
        const formattedContacts = contactsRes.data.users.map((c) => ({
          id: c.id,
          name: c.name,
          email: c.email,
          image: c.image,
          member_type: "3",
          listings: c.business_name ? [{ title: c.business_name }] : [],
        }));
        setContacts(formattedContacts);
      }

      if (membersRes.data.success) {
        const formattedMembers = membersRes.data.users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          image: u.image,
          member_type: "2",
          listings: u.business_name ? [{ title: u.business_name }] : [],
        }));
        setTracsMembers(formattedMembers);
      }
    } catch (error) {
      console.error("Error loading introduction data:", error);
    }
  };

  return { profile, data, contacts, tracsMembers };
}
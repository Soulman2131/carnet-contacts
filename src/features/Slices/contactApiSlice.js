import { CONTACTS_URL } from "../../url/baseUrl";
import { apiSlice } from "../Api/apiSlice";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => CONTACTS_URL,
      providesTags: ["Contact"],
    }),
    getContact: builder.query({
      query: (id) => `/contacts/${id}`,
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation({
      query: (data) => ({
        url: "/contacts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    editContact: builder.mutation({
      query: (data) => ({
        url: `/contacts/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactApiSlice;

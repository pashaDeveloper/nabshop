
const { nabApi } = require("../nab");

const userApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({

    // get user
    getUser: builder.query({
      query: (id) => ({
        url: `/user/get-user/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),

    // update user
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/user/update-information`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["User"],
    }),



    // delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete-user/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["User"],
    }),



 
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetSellerRequestQuery,
  useReviewSellerMutation,
} = userApi;

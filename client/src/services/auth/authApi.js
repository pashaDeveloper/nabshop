const { nabApi } = require("../nab");

const authApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({
    // signUp phone
    signUpPhone: builder.mutation({
      query: (body) => {
        return {
          url: "/user/sign-up-phone",
          method: "POST",
          body
        };
      },
      invalidatesTags: ["User"]
    }),

    // Verify phone
    verifyPhone: builder.mutation({
      query: (body) => {
        return {
          url: "/user/verify-phone",
          method: "POST",
          credentials: "include",
          body
        };
      },
      invalidatesTags: ["User"]
    }),

    // signUp google
    signUpGoogle: builder.mutation({
      query: (body) => {
        return {
          url: "/user/sign-up-google",
          method: "POST",
          credentials: "include",
          body
        };
      },
      invalidatesTags: ["User"]
    }),

    // persist login
    persistLogin: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        credentials: "include"
      }),

      providesTags: ["User"]
    })
  })
});

export const {
  useSignUpPhoneMutation,
  useSignUpGoogleMutation,
  useVerifyPhoneMutation,
  useSignInMutation,
  usePersistLoginQuery,
  useForgotPasswordMutation
} = authApi;

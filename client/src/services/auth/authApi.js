const { nabApi } = require("../nab");

const authApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({
    // signUp
    signUp: builder.mutation({
      query: (body) => {
        console.log("Sign Up Body:", body); // نمایش بدنه درخواست در کنسول
        return {
          url: "/user/sign-up",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    

    // signIn
    signIn: builder.mutation({
      query: (body) => ({
        url: "/user/sign-in",
        method: "POST",
        body,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/user/forgot-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),

    // persist login
    persistLogin: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useForgotPasswordMutation,
  usePersistLoginQuery,
} = authApi;

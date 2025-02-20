const { nabApi } = require("../nab");

const sessionApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({
    // createSession
    createSession: builder.mutation({
      query: () => {
        return {
          url: "/session/create",
          method: "POST",
          credentials: "include",
        };
      },
      invalidatesTags: ["SessionUser"]
    }),





    // persist sesssion
    persistSession: builder.query({
      query: () => ({
        url: "/session/me",
        method: "GET",
      
        credentials: "include"
      }),

      providesTags: ["SessionUser"]
    })
  })
});

export const {
  useCreateSessionMutation,
  usePersistSessionQuery,
} = sessionApi;

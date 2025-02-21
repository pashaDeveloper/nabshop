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
      invalidatesTags: ["Session"]
    }),

    // persist sesssion
    persistSession: builder.query({
      query: () => ({
        url: "/session/me",
        method: "GET",
      
        credentials: "include"
      }),

      providesTags: ["Session"]
    })
  })
});

export const {
  useCreateSessionMutation,
  usePersistSessionQuery,
} = sessionApi;

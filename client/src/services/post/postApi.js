const { nabApi } = require("../nab");

const postApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/post/get-posts",
        method: "GET"
      }),

      providesTags: ["Post","User"]
    }),

    // get a single post
    getPost: builder.query({
      query: (id) => ({
        url: `/post/get-post/${id}`,
        method: "GET"
      }),

      providesTags: ["Post"]
    }),

    // filtered posts
    getFilteredPosts: builder.mutation({
      query: (query) => ({
        url: `/post/filtered-posts?${query}`,
        method: "GET"
      }),

      providesTags: ["Post"]
    })
  })
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetFilteredPostsMutation
} = postApi;

const { nabApi } = require("../nab");

const blogApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "/blog/get-blogs",
        method: "GET"
      }),

      providesTags: ["Blog","User"]
    }),

    // get a single blog
    getBlog: builder.query({
      query: (id) => ({
        url: `/blog/get-blog/${id}`,
        method: "GET"
      }),

      providesTags: ["Blog"]
    }),

    // filtered blogs
    getFilteredBlogs: builder.mutation({
      query: (query) => ({
        url: `/blog/filtered-blogs?${query}`,
        method: "GET"
      }),

      providesTags: ["Blog"]
    })
  })
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useGetFilteredBlogsMutation
} = blogApi;

const { nabApi } = require("../nab");

const galleryApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({
    getGalleries: builder.query({
      query: () => ({
        url: "/gallery/get-galleries",
        method: "GET"
      }),

      providesTags: ["Gallery","User"]
    }),

    getFirstGallery: builder.query({
      query: () => ({
        url: `/gallery/get-first-gallery`,
        method: "GET"
      }),

      providesTags: ["Gallery"]
    }),


    // get a single gallery
    getGallery: builder.query({
      query: (id) => ({
        url: `/gallery/get-gallery/${id}`,
        method: "GET"
      }),

      providesTags: ["Gallery"]
    }),

    // filtered galleries
    getFilteredGallerys: builder.mutation({
      query: (query) => ({
        url: `/gallery/filtered-galleries?${query}`,
        method: "GET"
      }),

      providesTags: ["Gallery"]
    })
  })
});

export const {
  useGetGalleriesQuery,
  useGetFirstGalleryQuery,
  useGetGalleryQuery,
  useGetFilteredGallerysMutation
} = galleryApi;



const { nabApi } = require("../nab");

const categoryApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({
    

    // get all categories
    getCategories: builder.query({
      query: () => ({
        url: "/category/get-categories-with-products",
        method: "GET",
      }),

      providesTags: ["Category"],
    }),

   
    // get a category
    getCategory: builder.query({
      query: (id) => ({
        url: `/category/get-category/${id}`,
        method: "GET",
      }),

      providesTags: ["Category"],
    }),

  
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;

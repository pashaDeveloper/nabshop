

const { nabApi } = require("../nab");

const productApi = nabApi.injectEndpoints({
  endpoints: (builder) => ({
   
    getProducts: builder.query({
      query: () => ({
        url: "/product/get-detail-products",
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

    

    // get a single product
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/get-product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    getCartProduct: builder.query({
      query: (query) => ({
        url: `/product/get-product-cart`,
        method: "GET",
        params: { query },

      }),
      providesTags: ["Product"],
    }),

    // filtered products
    getFilteredProducts: builder.mutation({
      query: (query) => ({
        url: `/product/filtered-products?${query}`,
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

   
  }),
});

export const {
  useGetCartProductQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetFilteredProductsMutation,
} = productApi;

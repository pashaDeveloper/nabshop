

const { nabApi } = require("../nab");

const cartApi = nabApi.injectEndpoints({
  endpoints: (build) => ({
    // add to cart
    addToCart: build.mutation({
      query: (body) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        credentials: "include",
        body,
      }),

      invalidatesTags: ["Cart", "User","Session"],
    }),

    // get from cart
    getFromCart: build.query({
      query: () => ({
        url: "/cart/get-from-cart",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Cart"],
    }),

    // delete from cart
    deleteFromCart: build.mutation({
      query: (id) => ({
        url: `/cart/delete-cart/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Cart", "User","Session"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetFromCartQuery,
  useDeleteFromCartMutation,
} = cartApi;

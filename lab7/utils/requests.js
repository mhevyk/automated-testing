export const getAllProducts = async (ctx) => {
  const response = await ctx.get("/entries");
  const data = await response.json();
  return { response, data };
};

export const getProductById = async (ctx, args = {}) => {
  const response = await ctx.post("/view", { data: { id: args.id } });
  const data = await response.json();
  return { response, data };
};

export const getProductsFilteredByCategory = async (ctx, args = {}) => {
  const response = await ctx.post("/bycat", { data: { cat: args.category } });
  const data = await response.json();
  return { response, data };
};

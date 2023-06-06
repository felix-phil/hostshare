const apiEndpoints = {
  CATEGORIES: "/api/categories",
  LISTINGS: (location = "") => "/api/listings?location=" + location,
  SINGLE_LISTING: (id = "") => "/api/listing?id=" + id,
};
export default apiEndpoints;

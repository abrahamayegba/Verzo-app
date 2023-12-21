import * as Typesense from "typesense";
import { MultiSearchRequestsSchema } from "typesense/lib/Typesense/MultiSearch";

// const typesenseHost = process.env.NEXT_PUBLIC_TYPESENSE_HOST;
// const searchApiKey = process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_API_KEY;
export const client = new Typesense.Client({
  nodes: [
    {
      host: "167.99.142.132",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "VdetGahcpA1tjTCOa2HvtyYj1v5tECq8",
});

// export const client = new Typesense.Client({
//   nodes: [
//     {
//       host: "157.230.122.176",
//       port: 8108,
//       protocol: "http",
//     },
//   ],
//   apiKey: "YX6RtGwIUp1IvLdIil6BofusTQcQbCCy",
// });

export const searchAllCollections = async (
  search: string,
  businessId: string,
  userId: string
) => {
  try {
    const searchRequests: MultiSearchRequestsSchema = {
      searches: [
        {
          collection: "product",
          q: search,
          query_by: "productName", //to query by multiple columns
          prioritize_token_position: true,
          prioritize_exact_match: true,
          filter_by: `businessId:${businessId} && createdById:${userId}`, //to filter data by condition e.g name
        },
        {
          collection: "service",
          q: search,
          query_by: "name",
          prioritize_token_position: true,
          filter_by: `businessId:${businessId}`,
        },
        {
          collection: "customer",
          q: search,
          query_by: "name, email",
          prioritize_token_position: true,
          filter_by: `businessId:${businessId}`,
        },
        {
          collection: "merchant",
          q: search,
          query_by: "name, email",
          prioritize_token_position: true,
          filter_by: `businessId:${businessId}`,
        },
        {
          collection: "expense",
          q: search,
          query_by: "reference, description",
          prioritize_token_position: true,
          filter_by: `businessId:${businessId}`,
        },
        {
          collection: "purchase",
          q: search,
          query_by: "reference, description",
          prioritize_token_position: true,
          prioritize_exact_match: true,
          filter_by: `businessId:${businessId}`,
        },
        {
          collection: "sale",
          q: search,
          query_by: "reference, description",
          prioritize_token_position: true,
          prioritize_exact_match: true,
          filter_by: `businessId:${businessId}`,
        },
      ],
    };
    const searchResults = await client.multiSearch.perform(searchRequests);
    return searchResults;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import * as Typesense from "typesense";
import { MultiSearchRequestsSchema } from "typesense/lib/Typesense/MultiSearch";

export const client = new Typesense.Client({
  nodes: [
    {
      host: "167.99.142.132",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: "3qVI6BdGgGjpErkMJ4kQKiKZSHx9HglnEToPLQuVb7SSTrHx",
});

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
          filter_by: `businessId: ${businessId} && createdById: ${userId}`,
        },
        {
          collection: "service",
          q: search,
          query_by: "name",
          prioritize_token_position: true,
          filter_by: `businessId: ${businessId} && createdById: ${userId}`,
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

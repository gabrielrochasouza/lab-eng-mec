import {
    ICategoriesResponse,
    ICategoriesResponseWithImage,
    ISinglePostResponse,
    ISingleStockItemResponse,
    IStockItemResponse,
    IStocksAndPosts,
} from '@/interfaces';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlToken = String(import.meta.env.VITE_GRAPHQL_TOKEN);

const graphcms = new GraphQLClient(String(import.meta.env.VITE_GRAPHQL_URL), {
    headers: {
        authorization: graphqlToken,
    },
});

const queryGetAllStockItems = gql`
    query {
        stocks {
            shelfNumber
            cabinetNumber
            itemTitle
            id
            itemDescription
            itemSlug
            quantity
            itemPicture {
                url
            }
        }
    }
`;

const queryGetSingleStockItem = gql`
    query Stock($itemSlug: String!) {
        stock(where: {itemSlug: $itemSlug}) {
            shelfNumber
            cabinetNumber
            itemTitle
            id
            itemDescription
            quantity
            itemSlug
            itemPicture {
                url
            }
        }
    }
`;

const queryGetAllCategoriesPosts = gql`
    query {
        postCategories {
            id
            categoryName
            categorySlugName
            post {
                title
                slug
                id
            }
        }
    }
`;

const queryGetAllCategoriesPostsAndImages = gql`
    query {
        postCategories {
            id
            categoryName
            categorySlugName
            post {
                title
                slug
                id
                excerpt
                coverImage {
                    url
                }
            }
        }
    }
`;

const queryGetSinglePost = gql`
    query Post($slug: String!) {
        post(where: { slug: $slug }) {
            id
            title
            slug
            excerpt
            content {
                html
            }
            coverImage {
                url
            }
        }
    }
`;

const queryGetStocksAndPosts = gql`
    query {
        stocks {
            itemTitle
            itemSlug
            id
        }
        posts {
            title
            slug
            id
            excerpt
        }
        
    }
`;

export const getAllStockItems = async (): Promise<IStockItemResponse> => graphcms.request(queryGetAllStockItems);
export const getSingleStockItem = async (slug?: string): Promise<ISingleStockItemResponse> => graphcms.request(queryGetSingleStockItem, { itemSlug: slug });
export const getAllCategoriesPosts = async (): Promise<ICategoriesResponse> => graphcms.request(queryGetAllCategoriesPosts);
export const getSinglePost = async (slug?: string): Promise<ISinglePostResponse> => graphcms.request(queryGetSinglePost, { slug: slug });
export const getAllCategoriesPostsAndImages = async (): Promise<ICategoriesResponseWithImage> => graphcms.request(queryGetAllCategoriesPostsAndImages);
export const getStocksAndPosts = async (): Promise<IStocksAndPosts> => graphcms.request(queryGetStocksAndPosts);

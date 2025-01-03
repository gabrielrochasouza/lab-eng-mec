import { ICategoriesResponse, ISinglePostResponse } from '@/interfaces';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlToken = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MzI4MTIzMjksImF1ZCI6WyJodHRwczovL2FwaS11cy13ZXN0LTIuaHlncmFwaC5jb20vdjIvY200MWpubGtzMDFsZzA3dzZscG1ua3I5Yy9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC11cy13ZXN0LTIuaHlncmFwaC5jb20vIiwic3ViIjoiZTlhNTNlNjYtYWMzZC00YjIxLThlNGEtZDI1NmMyNjE4ODUxIiwianRpIjoiY2thNWoyZW9iMDN0YzAxd2gwZGZkNjdyeSJ9.RVRZ1UKFeIEpag6nimJMGrdL2NIVvdKaZUeXM9_tvCJb6j2lU_ch3ZeaNWByW-_4629tGXSewfywiI7LUt3xBAVhLeKY6_QSKTik2vI_XrhNWxnCTVT71Gheu89L6DTPATZxi6qzSpagliqLDCLjsK99zKAoWcC2WHwc13lxqH5NEg9SsNx0HheWGTGMHJgrBdxBvkLtzT_zPgMXnmO-0cAEizicEmJXIw1QIXeCFebjY1DHXuKuChz3ztNCr_VQHRyaMv7MlIt8m_KKpsH2K7ItjjiGjBvs8eamm0gPvAdiZbo6wnpGhHDJCFuQZyXOmw0diDrKEzLbq_yfJuLfT7wx9qjOiJF_1oKrhk3jApiUhkNBxB-paLgS4keRhm18qoMWAEDH9cZL0AFG6KYvRz6BHxKwX3OcekFgqw2tWGGWSRlrljQYm-95Ja8nTdtA5UOb9eMgV68AhJA7fXXQwFIuOdE6bJvpvuKgDMQPVTvwJ95W2fqt8e2qvHrN0ifmhPeMqrvBq1RxBYbBOwt_o0cDQzoT52sKKtCO4jS87SwIBk_Vl2oED3unzoJWid7MLwzOukJu31K7Wk9HtFXSLceNlgVU1o7QuLafNI23BwsoXVq0JEICPCN8xkHwJE4zNyoFRctAcX-n2OS9uWHl-fZLEtkPjMC9pnx3U1ZQWNU';
// const graphqlToken = String(process?.env?.GRAPHQL_TOKEN);

const graphcms = new GraphQLClient(`${window.location.origin}/graphql`, {
    headers: {
        contentType: 'application/json',
        authorization: graphqlToken,
    },
});

const queryGetAllStockItems = gql`
    query {
        {
            stock(where: {itemSlug: "creating-learning-platform-nextjs-13-app-router"}) {
                shelfNumber
                cabinetNumber
                itemTitle
                id
                itemSlug
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

export const getAllStockItems = async () => graphcms.request(queryGetAllStockItems);
export const getSingleStockItem = async (slug: string) => graphcms.request(queryGetSingleStockItem, { itemSlug: slug });
export const getAllCategoriesPosts = async (): Promise<ICategoriesResponse> => graphcms.request(queryGetAllCategoriesPosts);
export const getSinglePost = async (slug?: string): Promise<ISinglePostResponse> => graphcms.request(queryGetSinglePost, { slug: slug });

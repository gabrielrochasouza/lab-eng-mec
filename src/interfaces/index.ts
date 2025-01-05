/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPost {
    title: string,
    id: string,
    slug: string,
}

export interface IPostCategories {
    categoryName?: string,
    categorySlugName?: string,
    id?: string,
    post?: IPost[]
}

export interface IPostCategoriesWithImages {
    categoryName?: string,
    categorySlugName?: string,
    id?: string,
    post?: {
        title: string,
        id: string,
        slug: string,
        excerpt: string,
        coverImage: {
            url: string,
        }
    }[]
}

export interface IStockItem {
    shelfNumber: string,
    cabinetNumber: string,
    itemTitle: string,
    id: string,
    itemDescription: string,
    itemSlug: string,
    quantity: number,
    itemPicture: {
        url: string
    }
}

export interface IStockItemResponse {
    stocks?: IStockItem[]
}

export interface ICategoriesResponse {
    postCategories?: IPostCategories[]
}

export interface ICategoriesResponseWithImage {
    postCategories?: IPostCategoriesWithImages[]
}

export interface ISinglePost {
    id: string,
    title: string,
    slug: string,
    excerpt: string,
    content: {
        html?: string
        markdown?: string
    }
    coverImage: {
        url: string,
    }
}

export interface ISinglePostResponse {
    post?: ISinglePost
}

export interface IDatatable {
    rows: any,
    headers: {
        title?: string,
        value: string,
        headerClassName?: string,
        rowClassName?: string,
        prefixText?: string,
        action?: (row: any) => void,
    }[],
    tableName?: string,
}

export interface ISingleStockItemResponse {
    stock: {
        shelfNumber: string
        cabinetNumber: string
        itemTitle: string
        id: string
        itemDescription: string
        itemSlug: string
        quantity: number,
        itemPicture: {
            url: string
        }
    }
}

export interface IStocksAndPosts {
    stocks: {
        itemTitle: string,
        itemSlug: string,
        id: string,
    }[],
    posts: {
        id: string,
        title: string,
        slug: string,
        excerpt: string,
    }[]
}

export interface IStocksAndPostsResponse {
    stocksAndPosts: IStocksAndPosts
}

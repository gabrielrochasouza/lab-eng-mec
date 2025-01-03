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

export interface ICategoriesResponse {
    postCategories?: IPostCategories[]
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

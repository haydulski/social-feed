export interface PostProps {
    postData: {
        id: number,
        body: string;
        photos: any,
        users: User,
        created_at: string,
        comments: Comment[],
        reactions: Reaction[]
    }
}

export interface Comments {
    data: Comment[]
}

export type Comment = {
    id: number,
    user_id: number,
    post_id: number,
    body: string;
    created_at: string,
    updated_at: string,
    user: User
}

export type User = {
    id: number,
    name: string,
    email: string,
    created_at: string,
    updated_at: string,
    photos: Photo[]
}

export type Photo = {
    id: number,
    path: string,
}

export type Reaction = {
    value: string,
    user: string
}

export interface EmptyTypes {
    like: {
        count: number,
        names: Array<String>,
        iconPath: HTMLImageElement
    },
    wow: {
        count: number,
        names: Array<String>,
        iconPath: HTMLImageElement
    },
    love: {
        count: number,
        names: Array<String>,
        iconPath: HTMLImageElement
    },
    haha: {
        count: number,
        names: Array<String>,
        iconPath: HTMLImageElement
    }
}
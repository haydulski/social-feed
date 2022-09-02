import { Comment } from "../types/types"

export const guestCommentSchema = (added: number, post_id: number, comment: string): Comment => {

    return {
        id: 200 + added,
        user_id: 5,
        post_id: post_id,
        body: comment,
        created_at: "2022-06-05T10:30:12.000000Z",
        updated_at: "2022-06-05T10:30:12.000000Z",
        user: {
            id: 5,
            name: "Guest user",
            email: "gerson20@gaylord.org",
            created_at: "2022-08-24T11:28:57.000000Z",
            updated_at: "2022-08-24T11:28:57.000000Z",
            photos: [
                {
                    id: 1,
                    path: "https://via.placeholder.com/34x34.png/001166?text=guest"
                }
            ]
        }
    }
}
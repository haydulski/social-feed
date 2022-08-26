import React, { useEffect, useState } from 'react'
import Post from './post'
import axios from 'axios'

const Posts: React.FC = () => {

    const [posts, setPosts] = useState<any>();
    const getPosts = async () => {
        try {
            const response = await axios.get('/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        getPosts()

    }, [])

    return posts ? (
        <>
            {posts.map(post => (
                <div key={post.id}>
                    <Post postData={post} />
                </div>
            ))}
        </>
    ) : (
        <div>
            <div className='w-full rounded-md bg-gray-700 text-white px-4 py-4 my-8 min-h-[500px]'></div>
        </div>
    )
}

export default Posts;
import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';
import SearchBar from './SearchBar';

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

    const getSearchedPosts = async (posts: string) => {
        try {
            const response = await axios.get('/api/posts' + `?posts=${posts}`);
            setPosts(response.data);
        } catch (error) {
            console.log(error.message)
        }
    }

    const searchQuery = (data: string[]) => {
        getSearchedPosts(data[0]);
    }

    return posts ? (
        <>
            <SearchBar query={searchQuery} />
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
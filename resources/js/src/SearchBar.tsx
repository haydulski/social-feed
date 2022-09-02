import React, { useState, useEffect } from 'react';
import { _ } from 'lodash';

interface Props {
    query: (data: string[]) => void;
}

const SearchBar: React.FC<Props> = ({ query }) => {

    const [author, setAuthor] = useState('');
    const [post, setPost] = useState('');

    const saveAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    }
    const handleAuthorDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
        _.debounce(() => saveAuthor(e), 1000)();
    }

    const savePost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost(e.target.value);
    }
    const handlePostDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
        _.debounce(() => savePost(e), 1000)();
    }

    useEffect(() => {
        query([author, post]);
    }, [author]);

    useEffect(() => {
        query([author, post]);
    }, [post]);


    return (
        <>
            <div className="fixed px-8 py-8 left-0 top-[24vh] bg-gray-600 rounded-md shadow-lg min-w-[10vw] text-center">
                <h2 className='text-gray-400 font-bold'>Search posts</h2>
                <input type="text" onChange={handleAuthorDebounce}
                    className='block p-1 mt-2 focus:outline-none rounded-md' placeholder='Author...' />
                <input type="text" onChange={handlePostDebounce}
                    className='p-1 mt-2 focus:outline-none rounded-md' placeholder='Post content...' />
            </div>
        </>
    )
}

export default SearchBar;

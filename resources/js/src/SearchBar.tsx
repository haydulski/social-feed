import React, { useState, useEffect } from 'react';
import { _ } from 'lodash';

interface Props {
    query: (data: string[]) => void;
}

const SearchBar: React.FC<Props> = ({ query }) => {

    const [post, setPost] = useState<string>('null');
    const [search, setSearch] = useState(false);

    const savePost = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPost(e.target.value);

    }
    const handlePostDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(true);
        _.debounce(() => savePost(e), 1000)();
    }
    useEffect(() => {
        if (post != 'null') {
            query([post]);
            setTimeout(() => setSearch(false), 500);
        }

    }, [post]);

    return (
        <>
            <div className="hidden lg:block fixed px-8 py-8 left-0 top-[24vh] bg-gray-600 rounded-md shadow-lg min-w-[10vw] text-center">
                <h2 className='text-gray-400 font-bold'>Search posts</h2>
                <input type="text" onChange={handlePostDebounce}
                    className='p-1 mt-2 focus:outline-none rounded-md' placeholder='Post content...' />
                {search ? <p className='text-gray-500'>Searching...</p> : <p className='min-h-[1.5rem]'></p>}
            </div>
        </>
    )
}

export default SearchBar;

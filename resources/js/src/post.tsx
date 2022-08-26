import React, { useEffect, useState } from 'react';
import Comments from './comments';
import Comment from './svgs/comment';
import LikeSvg from './svgs/like';
import { PostProps } from './types/Types';
import ReactionsPanel from './reactions';

import Like from './imgs/like.png';
import Wow from './imgs/wow.png';
import Love from './imgs/love.png';
import Haha from './imgs/haha.png';
import axios from 'axios';

const Post: React.FC<PostProps> = ({ postData }) => {

    const [data, setData] = useState(postData);
    const { body, photos, created_at, users, comments, reactions, id } = data;
    const formattedDate = new Date(created_at);

    const handleReaction = async (type: string) => {
        try {
            const req = await axios.get('/api/reaction/' + type + '/' + id);
            const res = await req.data;
            console.log(res);
            setData({ ...postData, reactions: res });
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => { }, [data])

    return (
        <div className='w-full rounded-md bg-gray-700 text-white px-4 py-4 my-8'>
            <div className="user-info w-1/2 flex items-center my-2">
                <img src={users.photos[0].path} alt="user avatar" className='
                w-[40px] h-[40px] rounded-full' />
                <div className='ml-4'>
                    <h2>
                        {users.name}
                    </h2>
                    <p className='text-sm text-gray-400'>{formattedDate.toLocaleDateString()}</p>
                </div>
            </div>
            <p>{body}</p>
            <div className="photos flex py-2">
                {photos?.map(photo => (
                    <div key={photo.id} className='w-full'>
                        <img src={photo.path} alt="post photo" className='object-cover w-full max-h-[60vh]' />
                    </div>
                ))}
            </div>
            <div className="likes my-2 grid grid-cols-2 gap-2 mx-2">
                <div className="likes relative flex items-center">
                    {reactions.length === 0 ? (<></>) : (<>
                        <ReactionsPanel reactions={reactions} />
                    </>
                    )}
                </div>
                <div className="text-right text-gray-400">
                    <p className='cursor-pointer hover:underline'>{comments.length} comments</p>
                </div>
            </div>
            <div className="interactions mt-2 mb-1 border-t-[1px] border-gray-600 mx-2 grid grid-cols-2 gap-2">
                <div className="likes-container py-1 mt-1 fill-gray-500 text-gray-400 flex items-center relative
                cursor-pointer transition-colors duration-200 font-semibold justify-center rounded-md hover:bg-gray-600">
                    <LikeSvg />
                    <span>Like it!</span>
                    <div className="absolute likes-panel flex gap-1 z-50">
                        <img className='w-[30px] h-[30px] mr-1 hover:scale-125 transition-transform duration-200'
                            src={Like} alt="like panel" onClick={() => handleReaction('like')} />
                        <img className='w-[30px] h-[30px] mr-1 hover:scale-125 transition-transform duration-200'
                            src={Wow} alt="like panel" onClick={() => handleReaction('wow')} />
                        <img className='w-[30px] h-[30px] mr-1 hover:scale-125 transition-transform duration-200'
                            src={Love} alt="like panel" onClick={() => handleReaction('love')} />
                        <img className='w-[30px] h-[30px] mr-1 hover:scale-125 transition-transform duration-200'
                            src={Haha} alt="like panel" onClick={() => handleReaction('haha')} />
                    </div>
                </div>
                <div className="comment py-1 mt-1 fill-gray-500 text-gray-400 flex items-center
                cursor-pointer transition-colors duration-200 font-semibold justify-center rounded-md hover:bg-gray-600">
                    <Comment />
                    <span>Comment</span>
                </div>
            </div>
            <div className="comments mx-2 border-t-[1px] border-gray-600">
                <Comments data={comments} />
            </div>
        </div>
    )
}

export default Post

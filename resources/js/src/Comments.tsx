import React, { useState, useEffect } from 'react';
import { Comments as Props } from './types/types';
import { guestCommentSchema } from './misc/guestCommSchema';

const Comments: React.FC<Props> = ({ data }) => {

    const [more, setMore] = useState(false);
    const [newComment, setComment] = useState('Add your comment...');
    const [added, setAdded,] = useState(0);

    useEffect(() => { }, [added])

    const handleMore = (): void => {
        setMore(prev => !prev);
    }

    const handleComment = (e: React.ChangeEvent<HTMLInputElement>): void => {

        setComment(String(e.target.value))
    }

    const addComment = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            data.unshift(guestCommentSchema(added, data[0].post_id, newComment));
            setAdded(prev => ++prev);
            setComment('Add new comment...')
        }
    }

    const smallImg = data[0]?.user.photos[0].path.replace('640x480.png', '32x32.jpg');

    return (
        <>
            <div className='my-comment rounded-lg flex gap-2 items-start my-4'>
                <img className="rounded-full mr-4 mt-1" src='https://via.placeholder.com/34x34.jpg/001166?text=guest' alt="guest avatar " />
                <div className="comment w-full bg-gray-600 text white rounded-lg text-gray-100 p-2">
                    <input type="text" value={newComment} onChange={handleComment}
                        className='w-full bg-gray-600 focus:outline-none' onKeyPress={addComment} />
                </div>
            </div>
            {more || data.length < 2 ? (
                <>
                    {data?.map(
                        comment => {
                            const smallImage = comment.user.photos[0].path.replace('640x480.png', '32x32.jpg')
                            return (
                                <div key={comment.id + 'com'} className='rounded-lg flex gap-2 items-start my-4'>
                                    <img className="rounded-full mr-4 mt-1" src={smallImage} alt="profile avatar " />
                                    <div className="comment bg-gray-600 text white rounded-lg text-gray-100 p-2">
                                        <h5>{comment.user.name}</h5>
                                        <p>{comment.body}</p>
                                    </div>
                                </div>
                            )
                        }
                    )}
                    <h4 className='text-gray-100 cursor-pointer hover:underline' onClick={handleMore}>
                        Hide comments...
                    </h4>
                </>
            ) : (
                <>
                    <div key={data[0].id + 'com'} className='rounded-lg flex gap-2 items-start my-4'>
                        <img className="rounded-full mr-4" src={smallImg} alt="profile avatar " />
                        <div className="comment bg-gray-600 text white rounded-lg text-gray-100 p-2">
                            <h5>{data[0].user.name}</h5>
                            <p>{data[0].body}</p>
                        </div>
                    </div>
                    <h4 className='text-gray-100 cursor-pointer hover:underline' onClick={handleMore}>
                        Show more comments...</h4>
                </>
            )}
        </>
    )
}

export default Comments;
import React, { useEffect, useState } from 'react';
import { Reaction, EmptyTypes } from './types/Types';
import { emptyTypes } from './misc/emptyTypes';

interface Props {
    reactions: Reaction[]
}

const ReactionsPanel: React.FC<Props> = ({ reactions }) => {
    const [types, setTypes] = useState<EmptyTypes>(emptyTypes);

    useEffect(() => {
        let newTypes = emptyTypes;
        reactions.forEach(rel => {
            newTypes = {
                ...newTypes,
                [rel.value]: {
                    iconPath: newTypes[rel.value].iconPath,
                    count: newTypes[rel.value].count + 1,
                    names: [...newTypes[rel.value].names, rel.user]

                }
            }
        })
        setTypes(newTypes);
    }, [reactions])

    return (
        <>
            <div className="images flex gap-1">
                {types && Object.keys(types).map((name, index) => {
                    if (types[name].count > 0) {
                        const users1 = types[name].names;
                        return (
                            <div key={index + 'type'} className='emoji-container'>
                                <img className='w-[20px] h-[20px]' src={types[name].iconPath} alt="reaction symbol" />
                                <ul className="list-none z-40 emoji-list absolute top-4 p-2 bg-gray-200 text-black text-[14px] rounded-md">
                                    <p className='font-semibold capitalize mb-2'>{name}</p>
                                    {users1.map((user, i) => (<li key={i + '-user'}>
                                        {user}
                                    </li>))}
                                </ul>
                            </div>
                        )
                    }
                })
                }
            </div>
            <span className='ml-2'>{reactions.length}</span>
        </>
    )
}

export default ReactionsPanel;

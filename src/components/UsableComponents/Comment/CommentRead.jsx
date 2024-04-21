import React from 'react'

const CommentRead = ({ idx, firstName, lastName, email, id, comment }) => {
    return (
        <div key={idx} className="w-full flex flex-justify items-center p-1 ">
            <span className=" text-lg font-semibold text-start">{firstName + " " + lastName} </span>
            <span className="text-sm font-light">({email}) :- </span>
            <span className=" text-start text-sm font-light"> {comment}</span>
        </div>
    )
}

export default CommentRead
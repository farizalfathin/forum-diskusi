import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import {
  AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike,
} from 'react-icons/ai';
import formatCreatedAt from '../utils/format';

export default function ListComment({
  comments, onVote, onUpVote, onDownVote,
}) {
  return (
    <section className="w-full mt-4">
      <h3 className="text-lg font-medium">
        Komentar (
        {`${comments?.length}`}
        )
      </h3>
      <div className="flex flex-col mt-3 gap-2">
        {comments?.map((comment) => (
          <div className="flex flex-col gap-3 border-b border-secondary-300 pb-4" key={comment.id}>
            <div className="flex items-center">
              <img className="w-8 h-8 rounded-full" src={comment?.owner?.avatar} alt={comment?.owner?.name} />
              <p className="w-4/5 ms-2 text-lg font-medium">{comment?.owner?.name}</p>
              <p>{formatCreatedAt(comment?.createdAt)}</p>
            </div>
            <div>{parser(comment.content)}</div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1" onClick={() => onUpVote(comment?.id)} type="button">
                {onVote(comment?.id) === 1 ? <AiFillLike className="text-primary-500" /> : <AiOutlineLike />}
                <p>{comment?.upVotesBy?.length}</p>
              </button>
              <button className="flex items-center gap-1" onClick={() => onDownVote(comment?.id)} type="button">
                {onVote(comment?.id) === -1 ? <AiFillDislike className="text-primary-500" /> : <AiOutlineDislike />}
                <p>{comment?.downVotesBy?.length}</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

ListComment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onVote: PropTypes.func.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

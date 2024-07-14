import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { BiCommentDots } from 'react-icons/bi';
import {
  AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike,
} from 'react-icons/ai';
import formatCreatedAt from '../utils/format';

export default function ThreadItem({
  id, title, body, category, createdAt, createdBy, avatar, totalComments, downVote, upVote, onUpVote, onDownVote, onVote,
}) {
  return (
    <div className="pb-2 border-b border-black border-opacity-25">
      <h3 className="text-xl font-semibold mb-4"><Link className="text-primary-700 visited:text-primary-900" to={`/threads/${id}`}>{title}</Link></h3>
      <span className="px-2 py-1 border border-primary-500 text-primary-500 rounded text-sm">
        #
        {category}
      </span>
      <div className="mt-3 triple_dots">{parser(body)}</div>
      <div className="flex items-center gap-3 text-sm mt-3">
        <button className="flex items-center gap-1" onClick={() => onUpVote(id)} type="button">
          {onVote(id) === 1 ? <AiFillLike className="text-primary-500" /> : <AiOutlineLike />}
          <p>{upVote}</p>
        </button>
        <button className="flex items-center gap-1" onClick={() => onDownVote(id)} type="button">
          {onVote(id) === -1 ? <AiFillDislike className="text-primary-500" /> : <AiOutlineDislike />}
          <p>{downVote}</p>
        </button>
        <p className="flex items-center gap-1">
          <BiCommentDots />
          {totalComments}
        </p>
        <div className="flex items-center gap-2">
          <p>Dibuat oleh</p>
          <img className="w-6 h-6 rounded-full" src={avatar} alt={createdBy} />
          <b>{createdBy}</b>
        </div>
        <p>{formatCreatedAt(createdAt)}</p>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  createdBy: PropTypes.string,
  avatar: PropTypes.string,
  totalComments: PropTypes.number.isRequired,
  upVote: PropTypes.number.isRequired,
  downVote: PropTypes.number.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
};

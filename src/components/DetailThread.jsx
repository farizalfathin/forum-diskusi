import React from 'react';
import parser from 'html-react-parser';
import {
  AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike,
} from 'react-icons/ai';
import PropTypes from 'prop-types';
import formatCreatedAt from '../utils/format';

export default function DetailThread({
  category, title, body, upVote, downVote, ownerName, ownerAvatar, createdAt, onUpVote, onDownVote, onVote,
}) {
  return (
    <section className="w-full">
      <div>
        <span className="px-2 py-1 border border-primary-500 text-primary-500 rounded text-sm">
          #
          {category}
        </span>
        <h3 className="text-3xl font-semibold mt-2 text-primary-900">{title}</h3>
      </div>
      <div className="mt-4">{parser(`${body}`)}</div>
      <div className="flex items-center gap-3 mt-3">
        <button className="flex items-center gap-1" onClick={onUpVote} type="button">
          {onVote === 1 ? <AiFillLike className="text-primary-500" /> : <AiOutlineLike />}
          <p>{upVote}</p>
        </button>
        <button className="flex items-center gap-1" onClick={onDownVote} type="button">
          {onVote === -1 ? <AiFillDislike className="text-primary-500" /> : <AiOutlineDislike />}
          <p>{downVote}</p>
        </button>
        <div className="flex items-center gap-2">
          <p>Dibuat oleh</p>
          <img className="w-6 h-6 rounded-full" src={ownerAvatar} alt={ownerName} />
          <b>{ownerName}</b>
        </div>
        <p>{formatCreatedAt(createdAt)}</p>
      </div>
    </section>
  );
}

DetailThread.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upVote: PropTypes.number.isRequired,
  downVote: PropTypes.number.isRequired,
  ownerName: PropTypes.string.isRequired,
  ownerAvatar: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onVote: PropTypes.number.isRequired,
};

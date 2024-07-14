import React, { useState } from 'react';
import ContentEditable from 'react-contenteditable';
import { RiSendPlaneFill } from 'react-icons/ri';
import PropTypes from 'prop-types';

export default function AddCommment({ onAddComment, disabled }) {
  const [newComment, setNewComment] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newComment) {
      alert('fill the comment first');
      return;
    }

    onAddComment({ content: newComment });
    setNewComment('');
  };

  return (
    <div className="w-full py-4 bg-white">
      <form onSubmit={onSubmit}>
        <div className="flex gap-4 p-2 px-3 rounded-md bg-primary-100 items-end">
          <ContentEditable
            className="w-full max-h-36 outline-none bg-transparent text-secondary-700 overflow-y-auto scroll_hidden"
            data-placeholder="Add Comment..."
            html={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            tagName="div"
            disabled={disabled}
          />
          <button className="bg-primary-500 text-white text-lg p-2 rounded-full " type="submit"><RiSendPlaneFill /></button>
        </div>
      </form>
    </div>
  );
}

AddCommment.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

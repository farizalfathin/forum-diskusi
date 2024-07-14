import React, { useRef } from 'react';
import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';

export default function AddThread({ onAddThread }) {
  const bodyRef = useRef(null);

  const [newThread, setNewThread] = useForm({
    title: '',
    category: '',
    body: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!newThread.title || !newThread.category || !newThread.body) {
      return alert('title, category, and body are required');
    }
    return onAddThread(newThread);
  };

  return (
    <div className="w-full mt-3">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <input className="outline-none border-2 border-secondary-400 py-1 px-2 rounded-md" type="text" id="title" placeholder="input title..." onChange={(e) => setNewThread(e, 'title')} value={newThread.title} required />
          <input className="outline-none border-2 border-secondary-400 py-1 px-2 rounded-md" type="text" id="category" placeholder="input category..." onChange={(e) => setNewThread(e, 'category')} value={newThread.category} required />
          <ContentEditable
            ref={bodyRef}
            className="outline-none min-h-40 border-2 border-secondary-400 py-1 px-2 rounded-md"
            data-placeholder="input body..."
            html={newThread.body}
            onChange={(e) => setNewThread(e, 'body')}
            tagName="p"
          />
          <button className="bg-primary-500 self-start text-white text-lg rounded-md py-1 px-3" type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}

AddThread.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCategory } from '../toolkit/threads/slices';

export default function AllCategories() {
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.threads);
  const listCategories = useMemo(() => ['all', ...new Set(list.map((thread) => thread.category))], [list]);
  const handleFilterThreads = (category, index) => {
    setSelect(index);
    dispatch(filterByCategory(category));
  };

  return listCategories.length > 0 ? (
    <div className="flex gap-2 mb-4 mt-2">
      {listCategories.map((category, index) => (
        <button
          key={category}
          className={`text-sm text-primary-500 px-2 py-1 rounded-md border border-primary-500 hover:bg-primary-50 ${select === index && 'bg-primary-500 text-white hover:bg-primary-800'}`}
          type="button"
          onClick={() => handleFilterThreads(category, index)}
        >
          {category}
        </button>
      ))}
    </div>
  ) : null;
}

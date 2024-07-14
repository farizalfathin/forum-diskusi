import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadItem from './ThreadItem';
import { downVoteThreadThunk, neutralizeVoteThreadThunk, upVoteThreadThunk } from '../toolkit/detailThread/thunks';

export default function ThreadsList() {
  const authUser = useSelector((state) => state.authUser.data);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const [onVote, setOnVote] = useState([]);
  const dispatch = useDispatch();

  const usersMap = useMemo(() => users.list.reduce((acc, user) => {
    acc[user.id] = {
      owner: user.name,
      avatar: user.avatar,
    };
    return acc;
  }, {}), [users.list]);

  const threadList = threads.list.map((thread) => ({
    ...thread,
    ...usersMap[thread.ownerId],
  }));

  const defaultVote = (data) => {
    const votes = data.list.map((thread) => {
      if (thread?.upVotesBy?.some((id) => id === authUser.id)) {
        return {
          threadId: thread.id,
          voteType: 1,
        };
      }

      if (thread?.downVotesBy?.some((id) => id === authUser.id)) {
        return {
          threadId: thread.id,
          voteType: -1,
        };
      }

      return {
        threadId: thread.id,
        voteType: 0,
      };
    });

    setOnVote(votes);
  };

  useEffect(() => {
    if (authUser && threads) {
      defaultVote(threads);
    }
  }, [authUser, threads]);

  const onUpVote = (threadId) => {
    if (!authUser) {
      alert('Please login first');
      return;
    }

    const currentVote = onVote.find((vote) => vote.threadId === threadId)?.voteType;

    if (currentVote === 1) {
      setOnVote((prevState) => prevState.map((vote) => (vote.threadId === threadId ? { ...vote, voteType: 0 } : vote)));
      dispatch(neutralizeVoteThreadThunk(threadId));
    } else {
      setOnVote((prevState) => prevState.map((vote) => (vote.threadId === threadId ? { ...vote, voteType: 1 } : vote)));
      dispatch(upVoteThreadThunk(threadId));
    }
  };

  const onDownVote = (threadId) => {
    if (!authUser) {
      alert('Please login first');
      return;
    }

    const currentVote = onVote.find((vote) => vote.threadId === threadId)?.voteType;

    if (currentVote === -1) {
      setOnVote((prevState) => prevState.map((vote) => (vote.threadId === threadId ? { ...vote, voteType: 0 } : vote)));
      dispatch(neutralizeVoteThreadThunk(threadId));
    } else {
      setOnVote((prevState) => prevState.map((vote) => (vote.threadId === threadId ? { ...vote, voteType: -1 } : vote)));
      dispatch(downVoteThreadThunk(threadId));
    }
  };

  const onVoteById = (voteId) => onVote.find((vote) => vote.threadId === voteId)?.voteType;

  const filterThreads = useMemo(() => (threads.category !== 'all' ? threadList.filter((thread) => thread.category === threads.category) : threadList), [threads.category, threadList]);

  return (
    <div className={`w-full flex flex-col justify-center mb-6 gap-6 ${threads.status === 'Loading' && 'h-2/3'}`}>
      { threads.status === 'Loading' ? (<p className="text-xl mx-auto">Loading....</p>)
        : threads.status === 'Failed' ? (<p className="text-xl mx-auto">{threads.error}</p>)
          : filterThreads.map((thread) => (
            <ThreadItem
              key={thread.id}
              id={thread.id}
              title={thread.title}
              body={thread.body}
              category={thread?.category}
              createdAt={thread?.createdAt}
              createdBy={thread?.owner}
              totalComments={thread?.totalComments}
              avatar={thread?.avatar}
              upVote={thread?.upVotesBy?.length}
              downVote={thread?.downVotesBy?.length}
              onUpVote={onUpVote}
              onDownVote={onDownVote}
              onVote={onVoteById}
            />
          ))}
    </div>
  );
}

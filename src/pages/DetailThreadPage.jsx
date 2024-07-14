import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  createNewCommentThunk, downVoteCommentThunk, downVoteThreadThunk, getDetailThreadThunk, neutralizeVoteCommentThunk, neutralizeVoteThreadThunk, upVoteCommentThunk, upVoteThreadThunk,
} from '../toolkit/detailThread/thunks';
import DetailThread from '../components/DetailThread';
import AddCommment from '../components/AddComment';
import ListComment from '../components/ListComment';

export default function DetailThreadPage() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser.data);
  const [onVote, setOnVote] = useState();
  const [onVoteComment, setOnVoteComment] = useState([]);

  const defaultVoteThread = (data) => {
    if (data?.upVotesBy?.some((id) => id === authUser.id)) {
      setOnVote(1);
    } else if (data?.downVotesBy?.some((id) => id === authUser.id)) {
      setOnVote(-1);
    } else {
      setOnVote(0);
    }
  };

  const defaultVoteComment = (data) => {
    const votes = data?.comments?.map((comment) => {
      if (comment?.upVotesBy?.some((id) => id === authUser.id)) {
        return {
          commentId: comment.id,
          voteType: 1,
        };
      }

      if (comment?.downVotesBy?.some((id) => id === authUser.id)) {
        return {
          commentId: comment.id,
          voteType: -1,
        };
      }

      return {
        commentId: comment.id,
        voteType: 0,
      };
    });

    setOnVoteComment(votes);
  };

  useEffect(() => {
    dispatch(getDetailThreadThunk(threadId));
  }, [dispatch, threadId]);

  useEffect(() => {
    if (authUser && threadDetail.data) {
      defaultVoteThread(threadDetail.data);
      defaultVoteComment(threadDetail.data);
    }
  }, [authUser, threadDetail.data]);

  const onAddComment = ({ content }) => {
    if (!authUser) {
      alert('Please login first');
      return;
    }

    dispatch(createNewCommentThunk({ content, threadId }));
  };

  const onUpVote = () => {
    if (!authUser) {
      alert('Please login first');
      return;
    }

    if (onVote === 1) {
      setOnVote(0);
      dispatch(neutralizeVoteThreadThunk(threadId));
      return;
    }

    setOnVote(1);
    dispatch(upVoteThreadThunk(threadId));
  };

  const onDownVote = () => {
    if (!authUser) {
      alert('Please login first');
      return;
    }

    if (onVote === -1) {
      setOnVote(0);
      dispatch(neutralizeVoteThreadThunk(threadId));
      return;
    }

    setOnVote(-1);
    dispatch(downVoteThreadThunk(threadId));
  };

  const onUpVoteComment = (commentId) => {
    if (!authUser) {
      alert('Please login first');
      return;
    }

    const currentVote = onVoteComment.find((vote) => vote.commentId === commentId)?.voteType;

    if (currentVote === 1) {
      setOnVoteComment((prevState) => prevState.map((vote) => (vote.commentId === commentId ? { ...vote, voteType: 0 } : vote)));
      dispatch(neutralizeVoteCommentThunk({ threadId, commentId }));
    } else {
      setOnVoteComment((prevState) => prevState.map((vote) => (vote.commentId === commentId ? { ...vote, voteType: 1 } : vote)));
      dispatch(upVoteCommentThunk({ threadId, commentId }));
    }
  };

  const onDownVoteComment = (commentId) => {
    if (!authUser) {
      alert('Please login first');
      return;
    }

    const currentVote = onVoteComment.find((vote) => vote.commentId === commentId)?.voteType;

    if (currentVote === -1) {
      setOnVoteComment((prevState) => prevState.map((vote) => (vote.commentId === commentId ? { ...vote, voteType: 0 } : vote)));
      dispatch(neutralizeVoteCommentThunk({ threadId, commentId }));
    } else {
      setOnVoteComment((prevState) => prevState.map((vote) => (vote.commentId === commentId ? { ...vote, voteType: -1 } : vote)));
      dispatch(downVoteCommentThunk({ threadId, commentId }));
    }
  };

  const onVoteById = (voteId) => onVoteComment?.find((vote) => vote.commentId === voteId)?.voteType;

  return (
    <div className="w-full flex flex-col min-h-screen max-w-screen-md bg-white mx-auto px-8">
      <div className="w-full h-full py-8 overflow-y-auto">
        <DetailThread
          title={threadDetail.data.title}
          body={threadDetail.data.body}
          category={threadDetail.data.category}
          createdAt={threadDetail.data.createdAt}
          upVote={threadDetail.data?.upVotesBy?.length}
          downVote={threadDetail.data?.downVotesBy?.length}
          ownerName={threadDetail.data?.owner?.name}
          ownerAvatar={threadDetail.data?.owner?.avatar}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onVote={onVote}
        />
        <ListComment comments={threadDetail.data?.comments} onUpVote={onUpVoteComment} onDownVote={onDownVoteComment} onVote={onVoteById} />
      </div>
      <AddCommment onAddComment={onAddComment} disabled={!authUser} />
    </div>
  );
}

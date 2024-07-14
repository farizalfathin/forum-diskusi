const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAccessToken = () => localStorage.getItem('accessToken');

export const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

const fetchWithAuth = (url, options = {}) => fetch(url, {
  ...options,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export const registerUser = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.user;
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.token;
};

export const getAllUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.users;
};

export const getOwnUser = async () => {
  const response = await fetchWithAuth(`${BASE_URL}/users/me`);

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.user;
};

export const getAllThreads = async () => {
  const response = await fetch(`${BASE_URL}/threads`);

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.threads;
};

export const getDetailThread = async (id) => {
  const response = await fetch(`${BASE_URL}/threads/${id}`);

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.detailThread;
};

export const createOwnThread = async ({ title, body, category }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      body,
      category,
    }),
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.thread;
};

export const createOwnComment = async ({ content, threadId }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      content,
    }),
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.comment;
};

export const upVoteThread = async (threadId) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') {
    throw new Error(responseJSON.message);
  }

  return responseJSON.data.vote;
};

export const downVoteThread = async (threadId) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') {
    throw new Error(responseJSON.message);
  }

  return responseJSON.data.vote;
};

export const neutralizeVoteThread = async (threadId) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') {
    throw new Error(responseJSON.message);
  }

  return responseJSON.data.vote;
};

export const upVoteComment = async (threadId, commentId) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
    method: 'POST',
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') {
    throw new Error(responseJSON.message);
  }

  return responseJSON.data.vote;
};

export const downVoteComment = async (threadId, commentId) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
    method: 'POST',
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') {
    throw new Error(responseJSON.message);
  }

  return responseJSON.data.vote;
};

export const neutralizeVoteComment = async (threadId, commentId) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
    method: 'POST',
  });

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') {
    throw new Error(responseJSON.message);
  }

  return responseJSON.data.vote;
};

export const getLeaderboards = async () => {
  const response = await fetch(`${BASE_URL}/leaderboards`);

  const responseJSON = await response.json();

  if (responseJSON.status !== 'success') throw new Error(responseJSON.message);

  return responseJSON.data.leaderboards;
};

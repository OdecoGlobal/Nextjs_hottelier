import { API_URL } from '../constants';
import { FetchClient } from './core';

export const fetchClient = new FetchClient(API_URL, {
  credentials: 'include',
});

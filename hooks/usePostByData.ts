import { useState } from 'react';
import axiosClient from '../services/axiosClient';

interface PostResponse {
  success: boolean;
  message?: string;
  id?: number;
}

export function usePostByData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (url: string, data: any): Promise<PostResponse> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosClient.post(url, data);
      if (response && typeof response === 'object' && 'id' in response) {
        return { 
          success: true, 
          id: typeof response.id === 'number' ? response.id : undefined 
        };
      }
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  return {
    post,
    loading,
    error
  };
}
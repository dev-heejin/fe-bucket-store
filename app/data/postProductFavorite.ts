import { postItemHeartResponse } from '@/app/type';

export default async function postProductFavorite(code: string): Promise<postItemHeartResponse> {
  const response = await fetch(`/api/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })

  if (!response.ok) {
    throw new Error('Failed to update favorite status');
  }

  return response.json();
}
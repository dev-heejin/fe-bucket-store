import { DeleteItemHeartResponse } from '@/app/type';

export default async function deleteItemHeart(code: string): Promise<DeleteItemHeartResponse> {
  const response = await fetch(`/api/heart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete favorite status");
  }

  return response.json();
}

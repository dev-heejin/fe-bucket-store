'use client';
import { useEffect, useRef } from 'react';

export default function InfiniteScroll({ children, hasNextPage, nextPageHandler }: Readonly<{
  children: React.ReactNode;
}> & { hasNextPage: boolean, nextPageHandler: () => void }) {

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const io = new IntersectionObserver((entries, _observer) => {
      if (entries[0].isIntersecting) {
        if (hasNextPage) {
          nextPageHandler();
        }
      }
    });

    io.observe(bottomRef.current);

    return () => {
      io.disconnect();
    };
  }, [hasNextPage]);


  return (
    <>
      {children}
      <div ref={bottomRef} style={{ width: '100%', height: 30 }} />
    </>
  );
}
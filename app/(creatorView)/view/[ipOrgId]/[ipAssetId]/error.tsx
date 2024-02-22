'use client'; // Error components must be Client Components

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PropagateLoader } from 'react-spinners';

const MESSAGE_LIST = ['Fetching asset details', 'Loading metadata information'];
export default function Error({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();
  const MAX_RETRIES = 3;
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    console.error(error);

    const retryInterval = setInterval(() => {
      if (retryCount < MAX_RETRIES) {
        setRetryCount((count) => count + 1);
      } else {
        window.location.reload();
      }
    }, 3000);

    return () => clearInterval(retryInterval);
  }, [error, MAX_RETRIES, retryCount, router]);

  return (
    <div className="flex p-6 flex-col w-screen h-screen items-center justify-between">
      <img className="max-w-20" src="/story_logo.svg" alt="Story Protocol" />
      <div className="flex flex-col items-center justify-between gap-4 w-full ">
        <div className="relative flex flex-col w-full items-center">
          {MESSAGE_LIST.map((message, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex justify-center items-center transition-opacity duration-500 ${
                index === retryCount ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-center text-xl">{message}</p>
            </div>
          ))}
        </div>
        <PropagateLoader className="py-5" color="#837aea" speedMultiplier={0.5} />
      </div>

      <Link className="text-xs" href="https://am-explorer.storyprotocol.xyz/tos.pdf">
        Terms of service
      </Link>
    </div>
  );
}

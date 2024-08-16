import { fetchAccessToken } from 'hume';
import dynamic from 'next/dynamic';
import type { FC, PropsWithChildren } from 'react';

import { UsageLimit } from '@/components/UsageLimit';

const NoOp: FC<PropsWithChildren<Record<never, never>>> = ({ children }) => (
  <>{children}</>
);

const NoSSR = dynamic(
  () => new Promise<typeof NoOp>((resolve) => resolve(NoOp)),
  { ssr: false },
);


export default async function Home() {
  // Fetch the access token on the server side
  const accessToken = await fetchAccessToken({
    apiKey: process.env.HUME_API_KEY || '',
    secretKey: process.env.HUME_SECRET_KEY || '',
  });

  return (
    <div className={'p-6'}>
      <h1 className={'my-4 text-lg font-medium'}>🍋 HeartSpace | Voice</h1>

      {accessToken ? (
        <NoSSR>
          <UsageLimit accessToken={accessToken} />
        </NoSSR>
      ) : (
        <div>Missing API Key</div>
      )}
    </div>
  );
}

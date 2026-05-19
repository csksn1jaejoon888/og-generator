import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {

  return new ImageResponse(

    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#111',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#98FB98',
          fontSize: 72,
          fontWeight: 'bold',
        }}
      >
        TEST OG WORKING
      </div>
    ),

    {
      width: 1200,
      height: 630,
    }
  );
}

import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const robotoBold = fetch(
  new URL('./Roboto-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const robotoBlack = fetch(
  new URL('./Roboto-Black.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request) {

  const { searchParams } = new URL(request.url);

  const title =
    searchParams.get('title') || 'TREND4GENZ';

  const summary =
    searchParams.get('summary') ||
    'Streaming Trending Video';

  const tagsRaw =
    searchParams.get('tags') || '';

  const tags = tagsRaw
    ? tagsRaw.split(',').slice(0, 4)
    : [];

  // SUMMARY LIMIT
  const cleanSummary = summary.replace(/<[^>]*>/g, '');

  const summaryWords = cleanSummary.split(/\s+/);

  const shortSummary =
    summaryWords.slice(0, 22).join(' ') +
    (summaryWords.length > 22 ? '...' : '');

  // TITLE SPLIT
  const words = title.split(' ');

  let line1 = '';
  let line2 = '';

  for (const word of words) {

    if ((line1 + ' ' + word).trim().length <= 34) {

      line1 = (line1 + ' ' + word).trim();

    } else {

      line2 = (line2 + ' ' + word).trim();

    }
  }

  return new ImageResponse(

    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Roboto',
          backgroundColor: '#000',
        }}
      >

        {/* BACKGROUND */}
        <img
          src={new URL('./bg.png', import.meta.url).toString()}
          width="1200"
          height="630"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            objectFit: 'cover',
          }}
        />

        {/* DARK OVERLAY */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.35))',
          }}
        />

        {/* CONTENT AREA */}
        <div
          style={{
            position: 'absolute',
            left: 215,
            top: 225,
            width: 760,
            display: 'flex',
            flexDirection: 'column',
          }}
        >

          {/* TITLE */}
          <div
            style={{
              fontSize: 42,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              textShadow: '0 2px 10px rgba(0,0,0,.55)',
              maxWidth: 760,
            }}
          >
            {line1}
          </div>

          {line2 && (
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-1px',
                marginTop: 4,
                textShadow: '0 2px 10px rgba(0,0,0,.55)',
                maxWidth: 760,
              }}
            >
              {line2}
            </div>
          )}

          {/* TAGS */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 26,
              flexWrap: 'wrap',
            }}
          >
            {tags.map((tag, index) => (
              <div
                key={index}
                style={{
                  border: '1.5px solid #98FB98',
                  borderRadius: 999,
                  padding: '6px 16px',
                  color: '#98FB98',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: 1,
                  background: 'rgba(0,0,0,0.35)',
                }}
              >
                {tag.trim().toUpperCase()}
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div
            style={{
              marginTop: 24,
              fontSize: 18,
              lineHeight: 1.5,
              color: '#d0d0d0',
              maxWidth: 690,
              textShadow: '0 1px 6px rgba(0,0,0,.55)',
            }}
          >
            {shortSummary}
          </div>

        </div>

      </div>
    ),

    {
      width: 1200,
      height: 630,

      fonts: [
        {
          name: 'Roboto',
          data: await robotoBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Roboto',
          data: await robotoBlack,
          style: 'normal',
          weight: 900,
        },
      ],

      headers: {
        'Cache-Control':
          'public, immutable, no-transform, max-age=86400',
      },
    }
  );
}

import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {

  const { searchParams } = new URL(request.url);

  const title =
    searchParams.get('title') || 'Trend4GenZ';

  const summary =
    searchParams.get('summary') || 'Streaming Video Trending';

  const tagsRaw =
    searchParams.get('tags') || '';

  const tags = tagsRaw
    ? tagsRaw.split(',').slice(0, 5)
    : [];

  // SUMMARY LIMIT
  const words = summary
    .replace(/<[^>]*>/g, '')
    .split(/\s+/);

  const shortSum =
    words.slice(0, 20).join(' ') +
    (words.length > 20 ? '...' : '');

  // TITLE SPLIT
  const titleWords = title.split(' ');

  let line1 = '';
  let line2 = '';

  for (const w of titleWords) {

    if ((line1 + ' ' + w).trim().length <= 52) {

      line1 = (line1 + ' ' + w).trim();

    } else if ((line2 + ' ' + w).trim().length <= 52) {

      line2 = (line2 + ' ' + w).trim();

    } else {

      break;
    }
  }

  return new ImageResponse(

    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #1a1a1a 0%, #222222 60%, #2a2a2a 100%)',
          border: '4px solid #98FB98',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* INNER CARD */}
        <div
          style={{
            position: 'absolute',
            top: 45,
            left: 55,
            width: 1090,
            height: 500,
            background: '#1e1e1e',
            border: '1px solid #2e2e2e',
            borderRadius: 8,
          }}
        />

        {/* TOP LINE */}
        <div
          style={{
            position: 'absolute',
            top: 45,
            left: 55,
            width: 1090,
            height: 4,
            background: '#98FB98',
          }}
        />

        {/* LOGO */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            width: '100%',
            textAlign: 'center',
            fontSize: 52,
            fontWeight: 900,
            color: '#98FB98',
            letterSpacing: 8,
          }}
        >
          TREND4GENZ
        </div>

        {/* UNDERLINE */}
        <div
          style={{
            position: 'absolute',
            top: 148,
            left: 420,
            width: 360,
            height: 3,
            background: '#98FB98',
          }}
        />

        {/* TITLE */}
        <div
          style={{
            position: 'absolute',
            top: 190,
            left: 90,
            fontSize: 32,
            fontWeight: 800,
            color: '#f0f0f0',
            maxWidth: 920,
            lineHeight: 1.2,
          }}
        >
          {line1}
        </div>

        {line2 ? (
          <div
            style={{
              position: 'absolute',
              top: 232,
              left: 90,
              fontSize: 32,
              fontWeight: 800,
              color: '#f0f0f0',
              maxWidth: 920,
              lineHeight: 1.2,
            }}
          >
            {line2}
          </div>
        ) : null}

        {/* TAGS */}
        <div
          style={{
            position: 'absolute',
            top: line2 ? 300 : 255,
            left: 90,
            display: 'flex',
            gap: 10,
          }}
        >

          {tags.map((tag, i) => (

            <div
              key={i}
              style={{
                border: '1px solid #98FB98',
                borderRadius: 20,
                padding: '5px 14px',
                fontSize: 12,
                color: '#98FB98',
              }}
            >
              {tag.trim()}
            </div>

          ))}

        </div>

        {/* SUMMARY */}
        <div
          style={{
            position: 'absolute',
            top: line2 ? 355 : 310,
            left: 90,
            fontSize: 17,
            color: '#999',
            maxWidth: 760,
            lineHeight: 1.5,
          }}
        >
          {shortSum}
        </div>

        {/* BUTTON */}
        <div
          style={{
            position: 'absolute',
            bottom: 90,
            right: 75,
            border: '2px solid #98FB98',
            borderRadius: 24,
            padding: '12px 30px',
            fontSize: 14,
            fontWeight: 700,
            color: '#98FB98',
          }}
        >
          ▶ WATCH NOW
        </div>

        {/* FOOTER */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 62,
            background: '#111',
            borderTop: '2px solid #98FB98',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 40,
          }}
        >

          <div>

            <div
              style={{
                fontSize: 17,
                fontWeight: 900,
                color: '#f0f0f0',
              }}
            >
              TREND4GENZ.FUN
            </div>

            <div
              style={{
                fontSize: 12,
                color: '#777',
              }}
            >
              Streaming Video
            </div>

          </div>

        </div>

      </div>
    ),

    {
      width: 1200,
      height: 630,
    }
  );
}

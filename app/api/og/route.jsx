import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

// FONT
const roboto = fetch(
  new URL('./RobotoCondensed.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request) {

  const { searchParams } = new URL(request.url);

  const title   = searchParams.get('title') || 'Trend4GenZ';
  const summary = searchParams.get('summary') || 'Streaming Video Trending';
  const tagsRaw = searchParams.get('tags') || '';

  const tags = tagsRaw
    ? tagsRaw.split(',').slice(0, 5)
    : [];

  // CACHE BUSTING
  const v = searchParams.get('v') || Date.now();

  // SHORT SUMMARY
  const words = summary
    .replace(/<[^>]*>/g, '')
    .split(/\s+/);

  const shortSum =
    words.slice(0, 20).join(' ') +
    (words.length > 20 ? '...' : '');

  // SPLIT TITLE
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
          fontFamily: 'Roboto',
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
            display: 'flex',
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
            display: 'flex',
            justifyContent: 'center',
            fontSize: 54,
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
            top: 150,
            left: 420,
            width: 360,
            height: 3,
            background: '#98FB98',
          }}
        />

        {/* TITLE LINE 1 */}
        <div
          style={{
            position: 'absolute',
            top: 190,
            left: 90,
            fontSize: 34,
            fontWeight: 900,
            color: '#f0f0f0',
            maxWidth: 920,
            lineHeight: 1.2,
          }}
        >
          {line1}
        </div>

        {/* TITLE LINE 2 */}
        {line2 ? (

          <div
            style={{
              position: 'absolute',
              top: 235,
              left: 90,
              fontSize: 34,
              fontWeight: 900,
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
            top: line2 ? 305 : 255,
            left: 90,
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
          }}
        >

          {tags.map((tag, i) => (

            <div
              key={i}
              style={{
                border: '1px solid #98FB98',
                borderRadius: 999,
                padding: '5px 14px',
                fontSize: 12,
                fontWeight: 700,
                color: '#98FB98',
                display: 'flex',
                background: 'rgba(0,0,0,.25)',
              }}
            >
              {tag.trim().toUpperCase()}
            </div>

          ))}

        </div>

        {/* SUMMARY */}
        <div
          style={{
            position: 'absolute',
            top: line2 ? 360 : 310,
            left: 90,
            fontSize: 18,
            fontWeight: 500,
            color: '#b0b0b0',
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
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            fontWeight: 700,
            color: '#98FB98',
            letterSpacing: 1,
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

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            <span
              style={{
                fontSize: 17,
                fontWeight: 900,
                color: '#f0f0f0',
                letterSpacing: 1,
              }}
            >
              TREND4GENZ.FUN
            </span>

            <span
              style={{
                fontSize: 12,
                color: '#777',
              }}
            >
              Streaming Video
            </span>

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
          data: await roboto,
          style: 'normal',
          weight: 700,
        },
      ],

      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
}

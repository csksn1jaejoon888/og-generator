import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {

  const { searchParams } = new URL(request.url);

  const title =
    searchParams.get('title') || 'TREND4GENZ';

  const summary =
    searchParams.get('summary') || 'Streaming Video Trending';

  const tagsRaw =
    searchParams.get('tags') || '';

  const tags = tagsRaw
    ? tagsRaw.split(',').slice(0, 4)
    : [];

  // SUMMARY LIMIT
  const words = summary
    .replace(/<[^>]*>/g, '')
    .split(/\s+/);

  const shortSummary =
    words.slice(0, 20).join(' ') +
    (words.length > 20 ? '...' : '');

  return new ImageResponse(

  (
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: '#111',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        color: '#fff',
        padding: '60px',
        fontFamily: 'sans-serif',
      }}
    >
<img
  src="https://og-generator-puce.vercel.app/bg.png"
  width="1200"
  height="630"
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
  }}
/>

        {/* LOGO */}
        <div
          style={{
            color: '#98FB98',
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: 6,
          }}
        >
          TREND4GENZ
        </div>

        {/* LINE */}
        <div
          style={{
            width: 260,
            height: 4,
            background: '#98FB98',
            marginTop: 10,
            marginBottom: 40,
          }}
        />

        {/* TITLE */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* TAGS */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 30,
            flexWrap: 'wrap',
          }}
        >

          {tags.map((tag, i) => (

            <div
              key={i}
              style={{
                border: '1px solid #98FB98',
                borderRadius: 20,
                padding: '6px 14px',
                color: '#98FB98',
                fontSize: 14,
              }}
            >
              {tag.trim()}
            </div>

          ))}

        </div>

        {/* SUMMARY */}
        <div
          style={{
            marginTop: 35,
            fontSize: 22,
            lineHeight: 1.5,
            color: '#aaa',
            maxWidth: 850,
          }}
        >
          {shortSummary}
        </div>

        {/* BUTTON */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 60,
            border: '2px solid #98FB98',
            borderRadius: 30,
            padding: '12px 28px',
            color: '#98FB98',
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          ▶ WATCH NOW
        </div>

      </div>
    ),

    {
      width: 1200,
      height: 630,
    }
  );
}

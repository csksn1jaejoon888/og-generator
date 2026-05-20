import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const font = fetch(
  'https://og.trend4genz.fun/RobotoCondensed.ttf'
).then((res) => res.arrayBuffer());

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'Trend4GenZ';
  const summary = searchParams.get('summary') || 'Streaming Video Trending';
  const tagsRaw = searchParams.get('tags')    || '';
  const tags    = tagsRaw ? tagsRaw.split(',').slice(0, 5) : [];

  const words = summary.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean);
  const isCut = words.length > 9;
  const shortSummary = words.slice(0, 9).join(' ');

  const fontData = await font;

  const BOX_W = 680;
  const BOX_LEFT = (1200 - BOX_W) / 2; // center horizontal = 260

  const response = new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        display: 'flex',
        position: 'relative',
        fontFamily: 'RobotoCondensed',
        overflow: 'hidden',
      }}>

        {/* Background — tanpa overlay */}
        <img
          src="https://og.trend4genz.fun/bg.png?v=2"
          width={1200}
          height={630}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />

        {/* Kotak border mint — center horizontal, center vertical */}
        <div style={{
          position: 'absolute',
          top: 165,
          left: 135,
          width: 635,
          minHeight: 320,
          border: '1.5px solid #98FB98',
          borderTop: '3px solid #98FB98',
          borderRadius: 10,
          background: 'rgba(0,0,0,0.84)',
          padding: '28px 28px 22px 28px',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
        }}>

          {/* JUDUL */}
          <div style={{
            fontSize: 30,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.3,
            marginBottom: 16,
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {title}
          </div>

          {/* Divider */}
          <div style={{
            width: '100%', height: 1,
            background: 'rgba(152,251,152,0.2)',
            marginBottom: 14,
            display: 'flex',
          }}/>

          {/* TAGS */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 8,
            marginBottom: 18,
          }}>
            <span style={{
              fontSize: 10, color: '#ffffff',
              letterSpacing: 2, marginRight: 2,
              display: 'flex',
            }}>TAG :</span>
            {tags.map((tag, i) => (
              <div key={i} style={{
                border: '1px solid #98FB98',
                borderRadius: 10,
                padding: '2px 12px',
                fontSize: 11,
                color: '#98FB98',
                display: 'flex',
              }}>
                {tag.trim().toUpperCase()}
              </div>
            ))}
          </div>

          {/* SUMMARY + tanda lanjutan */}
          <div style={{
            fontSize: 15,
            color: '#cccccc',
            lineHeight: 1.6,
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'flex-start',
          }}>
            {shortSummary}
            {isCut && (
              <span style={{
                color: '#cccccc',
                marginLeft: 0,
                display: 'flex',
                alignItems: 'center',
              }}>
                ...
                <span style={{
                  color: '#98FB98',
                  fontWeight: 800,
                  fontSize: 16,
                  marginLeft: 4,
                  display: 'flex',
                }}>
                  ›
                </span>
              </span>
            )}
          </div>

          {/* READ MORE — kanan bawah, selalu tampil */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 16,
          }}>
            <span style={{
              fontSize: 13,
              color: '#98FB98',
              fontWeight: 700,
              letterSpacing: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}>
              Read more →
            </span>
          </div>

        </div>

      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{
        name: 'RobotoCondensed',
        data: fontData,
        style: 'normal',
        weight: 700,
      }],
    }
  );

  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

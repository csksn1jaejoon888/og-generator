import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'Trend4GenZ';
  const summary = searchParams.get('summary') || 'Streaming Video Trending';
  const tagsRaw = searchParams.get('tags')    || '';
  const tags    = tagsRaw ? tagsRaw.split(',').slice(0, 5) : [];

  const words = summary.replace(/<[^>]*>/g, '').split(' ');
  const shortSum = words.slice(0, 18).join(' ') + (words.length > 18 ? '...' : '');

  const titleWords = title.split(' ');
  let line1 = '', line2 = '';
  for (const w of titleWords) {
    if ((line1 + ' ' + w).trim().length <= 50) {
      line1 = (line1 + ' ' + w).trim();
    } else if ((line2 + ' ' + w).trim().length <= 50) {
      line2 = (line2 + ' ' + w).trim();
    } else break;
  }

  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        display: 'flex', flexDirection: 'column',
        background: '#1a1a1a',
        border: '4px solid #98FB98',
        fontFamily: 'sans-serif',
        overflow: 'hidden',
      }}>

        {/* MAIN CONTENT AREA */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '30px 60px 20px 60px',
          background: '#1e1e1e',
          margin: '30px 40px 0px 40px',
          borderRadius: '10px 10px 0 0',
          borderTop: '4px solid #98FB98',
        }}>

          {/* BRAND */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', marginBottom: 28,
          }}>
            <div style={{
              fontSize: 52, fontWeight: 900, color: '#98FB98',
              letterSpacing: 10, display: 'flex',
            }}>
              TREND4GENZ
            </div>
            <div style={{
              width: 380, height: 3,
              background: '#98FB98',
              marginTop: 8, display: 'flex',
            }}/>
          </div>

          {/* VIDEO TITLE */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignSelf: 'flex-start', width: '100%',
            marginBottom: 20,
          }}>
            <div style={{
              fontSize: 32, fontWeight: 700, color: '#f0f0f0',
              display: 'flex',
            }}>
              {line1}
            </div>
            {line2 ? (
              <div style={{
                fontSize: 32, fontWeight: 700, color: '#f0f0f0',
                marginTop: 6, display: 'flex',
              }}>
                {line2}
              </div>
            ) : null}
          </div>

          {/* TAGS */}
          <div style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: 10, marginBottom: 18,
          }}>
            <span style={{
              fontSize: 12, color: '#666',
              letterSpacing: 3, marginRight: 4,
              display: 'flex',
            }}>
              TAG :
            </span>
            {tags.map((tag, i) => (
              <div key={i} style={{
                border: '1.5px solid #98FB98',
                borderRadius: 14, padding: '4px 16px',
                fontSize: 13, color: '#98FB98',
                display: 'flex',
              }}>
                {tag.trim().toUpperCase()}
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div style={{
            fontSize: 17, color: '#aaaaaa',
            alignSelf: 'flex-start',
            display: 'flex',
          }}>
            {shortSum}
          </div>

          {/* WATCH NOW - align right */}
          <div style={{
            display: 'flex', width: '100%',
            justifyContent: 'flex-end',
            marginTop: 24,
          }}>
            <div style={{
              border: '2px solid #98FB98',
              borderRadius: 26, padding: '12px 32px',
              fontSize: 15, fontWeight: 700,
              color: '#98FB98', letterSpacing: 1.5,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              ▶  WATCH NOW
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div style={{
          height: 66, width: '100%',
          background: '#0f0f0f',
          borderTop: '2px solid #98FB98',
          display: 'flex', alignItems: 'center',
          paddingLeft: 50,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{
              fontSize: 18, fontWeight: 900,
              color: '#f0f0f0', letterSpacing: 1,
              display: 'flex',
            }}>
              TREND4GENZ.FUN
            </span>
            <span style={{
              fontSize: 12, color: '#666',
              display: 'flex',
            }}>
              Free Streaming Video
            </span>
          </div>
        </div>

      </div>
    ),
    { width: 1200, height: 630 }
  );
}

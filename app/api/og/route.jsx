import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'Trend4GenZ';
  const summary = searchParams.get('summary') || 'Streaming Video Trending';
  const tagsRaw = searchParams.get('tags')    || '';
  const tags    = tagsRaw ? tagsRaw.split(',').slice(0, 5) : [];

  // Potong summary max 18 kata
  const words = summary.replace(/<[^>]*>/g, '').split(' ');
  const shortSum = words.slice(0, 18).join(' ') + (words.length > 18 ? '...' : '');

  // Potong judul max 60 karakter per baris
  const titleWords = title.split(' ');
  let line1 = '', line2 = '';
  for (const w of titleWords) {
    if ((line1 + ' ' + w).trim().length <= 52) {
      line1 = (line1 + ' ' + w).trim();
    } else if ((line2 + ' ' + w).trim().length <= 52) {
      line2 = (line2 + ' ' + w).trim();
    } else break;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #222222 60%, #2a2a2a 100%)',
          border: '4px solid #98FB98',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Inner card */}
        <div style={{
          position: 'absolute', top: 45, left: 55,
          width: 1090, height: 500,
          background: '#1e1e1e',
          border: '1px solid #2e2e2e',
          borderRadius: 8,
          display: 'flex',
        }}/>

        {/* Top green accent */}
        <div style={{
          position: 'absolute', top: 45, left: 55,
          width: 1090, height: 4,
          background: '#98FB98',
        }}/>

        {/* TREND4GENZ title */}
        <div style={{
          position: 'absolute', top: 80,
          width: '100%', display: 'flex', justifyContent: 'center',
          fontSize: 52, fontWeight: 900, color: '#98FB98',
          letterSpacing: 8,
        }}>
          TREND4GENZ
        </div>

        {/* Underline */}
        <div style={{
          position: 'absolute', top: 148, left: 420,
          width: 360, height: 3, background: '#98FB98',
        }}/>

        {/* Video title line 1 */}
        <div style={{
          position: 'absolute', top: 175, left: 75,
          fontSize: 30, fontWeight: 700, color: '#f0f0f0',
          maxWidth: 1050,
        }}>
          {line1}
        </div>

        {/* Video title line 2 */}
        {line2 ? (
          <div style={{
            position: 'absolute', top: 215, left: 75,
            fontSize: 30, fontWeight: 700, color: '#f0f0f0',
            maxWidth: 1050,
          }}>
            {line2}
          </div>
        ) : null}

        {/* TAG label */}
        <div style={{
          position: 'absolute', top: line2 ? 268 : 238,
          left: 75, fontSize: 12, color: '#666',
          letterSpacing: 2,
        }}>
          TAG :
        </div>

        {/* Tag pills */}
        <div style={{
          position: 'absolute', top: line2 ? 258 : 228,
          left: 130, display: 'flex', gap: 10,
        }}>
          {tags.map((tag, i) => (
            <div key={i} style={{
              border: '1.5px solid #98FB98',
              borderRadius: 12, padding: '3px 14px',
              fontSize: 12, color: '#98FB98',
              display: 'flex',
            }}>
              {tag.trim()}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{
          position: 'absolute', top: line2 ? 310 : 280,
          left: 75, fontSize: 16, color: '#999',
          maxWidth: 1050,
        }}>
          {shortSum}
        </div>

        {/* WATCH NOW button */}
        <div style={{
          position: 'absolute', bottom: 90, right: 75,
          border: '2px solid #98FB98', borderRadius: 24,
          padding: '12px 30px', display: 'flex',
          alignItems: 'center', gap: 8,
          fontSize: 14, fontWeight: 700, color: '#98FB98',
          letterSpacing: 1,
        }}>
          ▶ WATCH NOW
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          width: '100%', height: 62,
          background: '#111',
          borderTop: '2px solid #98FB98',
          display: 'flex', alignItems: 'center',
          paddingLeft: 40,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 17, fontWeight: 900, color: '#f0f0f0', letterSpacing: 1 }}>
              TREND4GENZ.FUN
            </span>
            <span style={{ fontSize: 12, color: '#777' }}>
              Streaming Video
            </span>
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

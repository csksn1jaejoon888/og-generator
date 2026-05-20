import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const font = fetch(
  'https://og-generator-puce.vercel.app/RobotoCondensed.ttf'
).then((res) => res.arrayBuffer());

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'Trend4GenZ';
  const summary = searchParams.get('summary') || 'Streaming Video Trending';
  const tagsRaw = searchParams.get('tags')    || '';
  const tags    = tagsRaw ? tagsRaw.split(',').slice(0, 5) : [];

  // Summary max 20 kata + ...
  const words = summary.replace(/<[^>]*>/g, '').split(/\s+/);
  const shortSummary = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
  const hasMore = words.length > 20;

  const fontData = await font;

  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        display: 'flex',
        position: 'relative',
        fontFamily: 'RobotoCondensed',
        overflow: 'hidden',
      }}>

        {/* Background */}
        <img
          src="https://og-generator-puce.vercel.app/bg.png"
          width={1200}
          height={630}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />

        {/* Overlay gelap seluruh area agar teks lebih terbaca */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 1200, height: 630,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
        }}/>

        {/* Kotak border mint — tengah vertikal, kiri horizontal */}
        <div style={{
          position: 'absolute',
          top: 110,
          left: 60,
          width: 740,
          border: '1.5px solid #98FB98',
          borderRadius: 10,
          background: 'rgba(0,0,0,0.80)',
          padding: '26px 30px 20px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
          boxSizing: 'border-box',
        }}>

          {/* Garis atas hijau tipis */}
          <div style={{
            position: 'absolute',
            top: 0, left: 30,
            width: 680, height: 2,
            background: 'linear-gradient(90deg, #98FB98, transparent)',
            display: 'flex',
          }}/>

          {/* JUDUL */}
          <div style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.3,
            marginBottom: 16,
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: 680,
          }}>
            {title}
          </div>

          {/* Divider tipis */}
          <div style={{
            width: '100%', height: 1,
            background: 'rgba(152,251,152,0.2)',
            marginBottom: 14,
            display: 'flex',
          }}/>

          {/* TAG pills */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 10,
              color: '#888',
              letterSpacing: 2,
              marginRight: 4,
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

          {/* SUMMARY */}
          <div style={{
            fontSize: 14,
            color: '#cccccc',
            lineHeight: 1.6,
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: hasMore ? 10 : 0,
          }}>
            {shortSummary}
          </div>

          {/* READ MORE */}
          {hasMore && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 6,
            }}>
              <span style={{
                fontSize: 12,
                color: '#98FB98',
                fontWeight: 700,
                letterSpacing: 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                borderBottom: '1px solid rgba(152,251,152,0.4)',
                paddingBottom: 1,
              }}>
                Read more →
              </span>
            </div>
          )}

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
}

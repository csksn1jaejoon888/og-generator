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

  // Summary max 20 kata
  const words = summary.replace(/<[^>]*>/g, '').split(/\s+/);
  const shortSummary = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');

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

        {/* Background statis dari public folder */}
        <img
          src="https://og-generator-puce.vercel.app/bg.png"
          width={1200}
          height={630}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />

        {/* Kotak teks dengan border mint — posisi kiri tengah */}
        <div style={{
          position: 'absolute',
          top: 155,
          left: 75,
          width: 680,
          minHeight: 350,
          border: '1.5px solid #98FB98',
          borderRadius: 8,
          background: 'rgba(0,0,0,0.72)',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>

          {/* JUDUL — bold besar */}
          <div style={{
            fontSize: 30,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.25,
            marginBottom: 18,
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {title}
          </div>

          {/* TAG pills */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 8,
            marginBottom: 18,
          }}>
            <span style={{
              fontSize: 11,
              color: '#666',
              letterSpacing: 2,
              marginRight: 4,
              display: 'flex',
            }}>TAG :</span>
            {tags.map((tag, i) => (
              <div key={i} style={{
                border: '1px solid #98FB98',
                borderRadius: 12,
                padding: '3px 12px',
                fontSize: 12,
                color: '#98FB98',
                display: 'flex',
              }}>
                {tag.trim().toUpperCase()}
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div style={{
            fontSize: 15,
            color: '#bbbbbb',
            lineHeight: 1.5,
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {shortSummary}
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
}

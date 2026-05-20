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

  const words = summary.replace(/<[^>]*>/g, '').split(/\s+/);
  const shortSummary = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
  const hasMore = words.length > 20;

  const fontData = await font;

  // Hitung tinggi kotak dinamis berdasarkan konten
  // Judul: ~40px per baris, estimasi 1-2 baris
  const titleLen = title.length;
  const titleLines = titleLen <= 45 ? 1 : titleLen <= 90 ? 2 : 3;
  const titleHeight = titleLines * 38;
  const boxHeight = 28 + titleHeight + 16 + 1 + 14 + 30 + 16 + 48 + (hasMore ? 30 : 0) + 20;
  // top posisi agar kotak vertikal center di area konten (65px navbar, 565px bottom bar)
  const contentArea = 630 - 65 - 65; // 500px
  const boxTop = 65 + Math.max(20, (contentArea - boxHeight) / 2);

  const response = new ImageResponse(
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

        {/* Overlay seluruh area */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 1200, height: 630,
          background: 'rgba(0,0,0,0.50)',
          display: 'flex',
        }}/>

        {/* Kotak konten — vertikal center, kiri */}
        <div style={{
          position: 'absolute',
          top: boxTop,
          left: 55,
          width: 730,
          border: '1.5px solid #98FB98',
          borderRadius: 10,
          background: 'rgba(0,0,0,0.82)',
          padding: '28px 30px 22px 30px',
          display: 'flex',
          flexDirection: 'column',
        }}>

          {/* Garis gradien atas */}
          <div style={{
            position: 'absolute',
            top: 0, left: 24,
            width: 682, height: 2,
            background: 'linear-gradient(90deg, #98FB98 60%, transparent)',
            display: 'flex',
          }}/>

          {/* JUDUL */}
          <div style={{
            fontSize: 30,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.25,
            marginBottom: 14,
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {title}
          </div>

          {/* Divider */}
          <div style={{
            width: '100%', height: 1,
            background: 'rgba(152,251,152,0.25)',
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
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 10, color: '#777',
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

          {/* SUMMARY */}
          <div style={{
            fontSize: 15,
            color: '#cccccc',
            lineHeight: 1.55,
            display: 'flex',
            flexWrap: 'wrap',
          }}>
            {shortSummary}
          </div>

          {/* READ MORE */}
          {hasMore && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 12,
            }}>
              <span style={{
                fontSize: 12,
                color: '#98FB98',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                opacity: 0.9,
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
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache',
      },
    }
  );

  // Tambah header no-cache pada response
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Surrogate-Control', 'no-store');

  return response;
}

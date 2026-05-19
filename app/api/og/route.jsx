import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'Trend4GenZ';
  const summary = searchParams.get('summary') || 'Streaming Video Trending';
  const tagsRaw = searchParams.get('tags')    || '';
  const tags    = tagsRaw ? tagsRaw.split(',').slice(0, 5) : [];

  // Summary max 18 kata
  const words = summary.replace(/<[^>]*>/g, '').split(' ');
  const shortSum = words.slice(0, 18).join(' ') + (words.length > 18 ? '...' : '');

  // Judul max 2 baris ~45 karakter
  const titleWords = title.split(' ');
  let line1 = '', line2 = '';
  for (const w of titleWords) {
    if ((line1 + ' ' + w).trim().length <= 45) {
      line1 = (line1 + ' ' + w).trim();
    } else if ((line2 + ' ' + w).trim().length <= 45) {
      line2 = (line2 + ' ' + w).trim();
    } else break;
  }

  // Fetch background dari GitHub
  const bgUrl = 'https://raw.githubusercontent.com/csksn1jaejoon888/og-generator/main/bg.png';
  const bgRes  = await fetch(bgUrl);
  const bgBuf  = await bgRes.arrayBuffer();
  const bgB64  = Buffer.from(bgBuf).toString('base64');
  const bgSrc  = `data:image/png;base64,${bgB64}`;

  return new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        display: 'flex',
        position: 'relative',
        fontFamily: 'sans-serif',
        overflow: 'hidden',
      }}>

        {/* Background statis */}
        <img src={bgSrc} style={{
          position: 'absolute',
          top: 0, left: 0,
          width: 1200, height: 630,
        }}/>

        {/* Teks dinamis — posisi disesuaikan dengan background */}
        <div style={{
          position: 'absolute',
          top: 255,        // mulai di bawah logo TREND4GENZ
          left: 275,       // sejajar dengan teks di background
          width: 730,      // lebar area konten
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>

          {/* Judul baris 1 */}
          <div style={{
            fontSize: 26, fontWeight: 700,
            color: '#e8e8e8', display: 'flex',
            marginBottom: 4,
          }}>
            {line1}
          </div>

          {/* Judul baris 2 */}
          {line2 ? (
            <div style={{
              fontSize: 26, fontWeight: 700,
              color: '#e8e8e8', display: 'flex',
              marginBottom: 4,
            }}>
              {line2}
            </div>
          ) : null}

          {/* TAG pills */}
          <div style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center', gap: 6,
            marginTop: 10, marginBottom: 10,
          }}>
            <span style={{
              fontSize: 11, color: '#666',
              letterSpacing: 2, display: 'flex',
              marginRight: 2,
            }}>TAG :</span>
            {tags.map((tag, i) => (
              <div key={i} style={{
                border: '1px solid #5aad5a',
                borderRadius: 12, padding: '2px 12px',
                fontSize: 11, color: '#7acc7a',
                display: 'flex',
              }}>
                {tag.trim().toUpperCase()}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{
            fontSize: 14, color: '#999999',
            display: 'flex', lineHeight: 1.4,
          }}>
            {shortSum}
          </div>

        </div>

      </div>
    ),
    { width: 1200, height: 630 }
  );
}

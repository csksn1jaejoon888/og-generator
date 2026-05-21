import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

// ✅ Pindahkan font fetch ke DALAM handler
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title   = searchParams.get('title')   || 'Trend4GenZ';
  const summary = searchParams.get('summary') || 'Streaming Video Trending';
  const tagsRaw = searchParams.get('tags')    || '';
  const tags    = tagsRaw ? tagsRaw.split(',').slice(0, 5) : [];

  const words = summary.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean);
  const isCut = words.length > 9;
  const shortSummary = words.slice(0, 9).join(' ') + (isCut ? '...' : '');

  // ✅ Font fetch di dalam handler dengan try/catch
  let fontData;
  try {
    const fontRes = await fetch('https://og.trend4genz.fun/RobotoCondensed.ttf');
    fontData = await fontRes.arrayBuffer();
  } catch(e) {
    fontData = null; // fallback tanpa custom font
  }

  const fonts = fontData ? [{
    name: 'RobotoCondensed',
    data: fontData,
    style: 'normal',
    weight: 700,
  }] : [];

  const response = new ImageResponse(
    (
      <div style={{
        width: 1200, height: 630,
        display: 'flex',
        position: 'relative',
        fontFamily: fontData ? 'RobotoCondensed' : 'sans-serif',
        overflow: 'hidden',
      }}>
        {/* ... sisa JSX kamu sama persis ... */}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );

  // ✅ Header yang X butuhkan
  response.headers.set('Cache-Control', 'public, max-age=3600');
  response.headers.set('Content-Type', 'image/png');
  return response;
}

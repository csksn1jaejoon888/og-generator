export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('v') || '';
  const lang = searchParams.get('lang') || 'en';

  const dbUrl = lang === 'id'
    ? 'https://trend4genz.fun/db-id.json'
    : 'https://trend4genz.fun/db-en.json';

  let video = null;

  try {
    const res = await fetch(dbUrl);
    const db = await res.json();
    video = db.find(v =>
      v.slug === slug ||
      seoUrl(v.title) === slug
    );
  } catch(e) {
    video = null;
  }

  const title   = video ? video.title + ' | Trend4GenZ' : 'Trend4GenZ - Streaming Video Trending';
  const desc    = video
    ? (video.summary || video.title).replace(/<[^>]*>/g, '').substring(0, 160)
    : 'Streaming video trending terbaru.';
  const tags    = video && video.tags ? video.tags.slice(0, 5).join(',') : 'TRENDING,VIDEO,STREAMING';
  const summary = video
    ? (video.summary || video.title).replace(/<[^>]*>/g, '').substring(0, 150)
    : 'Streaming Video Trending';

  const ogImage = 'https://og.trend4genz.fun/api/og'
    + '?title=' + encodeURIComponent(video ? video.title : 'Trend4GenZ')
    + '&summary=' + encodeURIComponent(summary)
    + '&tags=' + encodeURIComponent(tags);

  const pageUrl = 'https://trend4genz.fun/?lang=' + lang + '&v=' + slug;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta property="og:type" content="video.other"/>
  <meta property="og:site_name" content="Trend4GenZ"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:image" content="${ogImage}"/>
  <meta property="og:image:width" content="1200"/>
  <meta property="og:image:height" content="630"/>
  <meta property="og:url" content="${pageUrl}"/>
  <meta property="og:locale" content="${lang === 'id' ? 'id_ID' : 'en_US'}"/>
  ${video ? `<meta property="og:video" content="https://www.youtube.com/embed/${video.youtubeId}"/>` : ''}
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:site" content="@trend4genz"/>
  <meta name="twitter:title" content="${title}"/>
  <meta name="twitter:description" content="${desc}"/>
  <meta name="twitter:image" content="${ogImage}"/>
  <script>
  var ua = navigator.userAgent.toLowerCase();
  var isBot = ua.includes('facebookexternalhit') || ua.includes('twitterbot') || ua.includes('linkedinbot') || ua.includes('whatsapp') || ua.includes('telegrambot');
  if (!isBot) window.location.replace("${pageUrl}");
<\/script>
</head>
<body>
  <p>Redirecting... <a href="${pageUrl}">Klik di sini</a></p>
</body>
</html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-store, max-age=0',
    }
  });
}

function seoUrl(text) {
  return text.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .substring(0, 70)
    .replace(/-$/, '');
}

import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

export async function GET(req) {

  try {

    const { searchParams } = new URL(req.url)

    const title =
      searchParams.get('title') || 'TREND4GENZ'

    const summary =
      searchParams.get('summary') ||
      'Streaming trending video'

    const tagsRaw =
      searchParams.get('tags') || ''

    const tags = tagsRaw
      ? tagsRaw.split(',').slice(0, 4)
      : []

    // SHORT SUMMARY
    const words = summary
      .replace(/<[^>]*>/g, '')
      .split(/\s+/)

    const shortSummary =
      words.slice(0, 20).join(' ') +
      (words.length > 20 ? '...' : '')

    // TITLE SPLIT
    const titleWords = title.split(' ')

    let line1 = ''
    let line2 = ''

    for (const word of titleWords) {

      if ((line1 + ' ' + word).length <= 34) {

        line1 += ` ${word}`

      } else {

        line2 += ` ${word}`
      }
    }

    // LOAD FONT
    const fontData = await fetch(
      new URL('./RobotoCondensed.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    // LOAD BG
    const bg = new URL('./bg.png', import.meta.url).toString()

    return new ImageResponse(

      (
        <div
          style={{
            width: '1200px',
            height: '630px',
            position: 'relative',
            display: 'flex',
            overflow: 'hidden',
            backgroundColor: '#000',
            fontFamily: 'Roboto',
          }}
        >

          {/* BACKGROUND */}
          <img
            src={bg}
            width="1200"
            height="630"
            style={{
              position: 'absolute',
              inset: 0,
              objectFit: 'cover',
            }}
          />

          {/* CONTENT */}
          <div
            style={{
              position: 'absolute',
              left: 220,
              top: 230,
              width: 720,
              display: 'flex',
              flexDirection: 'column',
            }}
          >

            {/* TITLE */}
            <div
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.1,
                textShadow: '0 2px 8px rgba(0,0,0,.6)',
              }}
            >
              {line1.trim()}
            </div>

            {line2.trim() && (

              <div
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.1,
                  marginTop: 4,
                  textShadow: '0 2px 8px rgba(0,0,0,.6)',
                }}
              >
                {line2.trim()}
              </div>
            )}

            {/* TAGS */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                marginTop: 24,
                flexWrap: 'wrap',
              }}
            >

              {tags.map((tag, i) => (

                <div
                  key={i}
                  style={{
                    border: '1px solid #98FB98',
                    borderRadius: 999,
                    padding: '5px 14px',
                    color: '#98FB98',
                    fontSize: 13,
                    fontWeight: 700,
                    background: 'rgba(0,0,0,.35)',
                  }}
                >
                  {tag.trim().toUpperCase()}
                </div>

              ))}

            </div>

            {/* SUMMARY */}
            <div
              style={{
                marginTop: 24,
                fontSize: 18,
                lineHeight: 1.5,
                color: '#d0d0d0',
                maxWidth: 650,
                textShadow: '0 1px 6px rgba(0,0,0,.6)',
              }}
            >
              {shortSummary}
            </div>

          </div>

        </div>
      ),

      {
        width: 1200,
        height: 630,

        fonts: [
          {
            name: 'Roboto',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],

        headers: {
          'Cache-Control':
            'public, immutable, no-transform, max-age=86400',
        },
      }
    )

  } catch (e) {

    return new Response(
      `OG Error: ${e.message}`,
      { status: 500 }
    )
  }
}

import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url)

    const title = searchParams?.get('title')?.slice(0, 100)
    const description = searchParams?.get('description')?.slice(0, 200)

    return new ImageResponse(
      (
        <div tw="w-screen h-screen p-32 flex flex-col justify-center bg-[#121212]">
          <div tw="flex flex-col w-full items-center text-center">
            {title && (
              <h1 tw="text-4xl font-bold text-gray-300 leading-tight">
                {title}
              </h1>
            )}
            {description && (
              <p tw="font-medium text-2xl text-gray-500">{description}</p>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (e) {
    // @ts-expect-error
    const error = e?.message || e?.stackTrace.toString() || 'Unexpected error'
    console.error('Error generate image: ', error)

    return new NextResponse(
      JSON.stringify({ message: 'Failed to generate image' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}

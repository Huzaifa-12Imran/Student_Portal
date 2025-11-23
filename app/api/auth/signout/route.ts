import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      { message: 'Signout successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Signout error:', error)
    return NextResponse.json(
      { error: 'An error occurred during signout' },
      { status: 500 }
    )
  }
}

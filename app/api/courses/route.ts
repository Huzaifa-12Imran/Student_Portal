import { getDatabase } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const teacherId = searchParams.get('teacherId')

    const db = await getDatabase()
    const coursesCollection = db.collection('courses')

    const filter: Record<string, any> = {}

    if (teacherId) {
      filter.teacher_id = teacherId
    }

    const data = await coursesCollection.find(filter).toArray()

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Get courses error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, name, description, teacherId, semester } = await request.json()

    if (!code || !name || !teacherId || !semester) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const coursesCollection = db.collection('courses')

    const result = await coursesCollection.insertOne({
      code,
      name,
      description: description || undefined,
      teacher_id: teacherId,
      semester,
      created_at: new Date(),
    })

    const insertedDoc = await coursesCollection.findOne({
      _id: result.insertedId,
    })

    return NextResponse.json(
      { message: 'Course created', data: [insertedDoc] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Post courses error:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}

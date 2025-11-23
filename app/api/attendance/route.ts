import { getDatabase } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const courseId = searchParams.get('courseId')

    const db = await getDatabase()
    const attendanceCollection = db.collection('attendance')

    const filter: Record<string, any> = {}

    if (studentId) {
      filter.student_id = studentId
    }

    if (courseId) {
      filter.course_id = courseId
    }

    const data = await attendanceCollection.find(filter).toArray()

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Get attendance error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch attendance records' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { studentId, courseId, date, status } = await request.json()

    if (!studentId || !courseId || !date || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const attendanceCollection = db.collection('attendance')

    const result = await attendanceCollection.insertOne({
      student_id: studentId,
      course_id: courseId,
      date,
      status,
      created_at: new Date(),
    })

    const insertedDoc = await attendanceCollection.findOne({
      _id: result.insertedId,
    })

    return NextResponse.json(
      { message: 'Attendance recorded', data: [insertedDoc] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Post attendance error:', error)
    return NextResponse.json(
      { error: 'Failed to record attendance' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const attendanceCollection = db.collection('attendance')

    const result = await attendanceCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { status } },
      { returnDocument: 'after' }
    )

    if (!result.value) {
      return NextResponse.json(
        { error: 'Attendance record not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Attendance updated', data: [result.value] },
      { status: 200 }
    )
  } catch (error) {
    console.error('Patch attendance error:', error)
    return NextResponse.json(
      { error: 'Failed to update attendance' },
      { status: 500 }
    )
  }
}

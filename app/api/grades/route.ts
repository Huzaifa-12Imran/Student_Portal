import { getDatabase } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const studentId = searchParams.get('studentId')
    const courseId = searchParams.get('courseId')

    const db = await getDatabase()
    const gradesCollection = db.collection('grades')

    const filter: Record<string, any> = {}

    if (studentId) {
      filter.student_id = studentId
    }

    if (courseId) {
      filter.course_id = courseId
    }

    const data = await gradesCollection.find(filter).toArray()

    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Get grades error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grades' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { studentId, courseId, marks, totalMarks } = await request.json()

    if (!studentId || !courseId || marks === undefined || !totalMarks) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const percentage = (marks / totalMarks) * 100
    const grade = getGrade(percentage)

    const db = await getDatabase()
    const gradesCollection = db.collection('grades')

    const result = await gradesCollection.insertOne({
      student_id: studentId,
      course_id: courseId,
      marks,
      total_marks: totalMarks,
      percentage,
      grade,
      created_at: new Date(),
      updated_at: new Date(),
    })

    const insertedDoc = await gradesCollection.findOne({
      _id: result.insertedId,
    })

    return NextResponse.json(
      { message: 'Grade recorded', data: [insertedDoc] },
      { status: 201 }
    )
  } catch (error) {
    console.error('Post grades error:', error)
    return NextResponse.json(
      { error: 'Failed to record grade' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, marks, totalMarks } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Grade ID is required' },
        { status: 400 }
      )
    }

    const updateData: Record<string, any> = { updated_at: new Date() }

    if (marks !== undefined) {
      updateData.marks = marks
    }

    if (totalMarks) {
      updateData.total_marks = totalMarks
    }

    if (marks !== undefined && totalMarks) {
      const percentage = (marks / totalMarks) * 100
      updateData.percentage = percentage
      updateData.grade = getGrade(percentage)
    }

    const db = await getDatabase()
    const gradesCollection = db.collection('grades')

    const result = await gradesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!result.value) {
      return NextResponse.json(
        { error: 'Grade not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Grade updated', data: [result.value] },
      { status: 200 }
    )
  } catch (error) {
    console.error('Patch grades error:', error)
    return NextResponse.json(
      { error: 'Failed to update grade' },
      { status: 500 }
    )
  }
}

function getGrade(percentage: number): string {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B'
  if (percentage >= 60) return 'C'
  if (percentage >= 50) return 'D'
  return 'F'
}

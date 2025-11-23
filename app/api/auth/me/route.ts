import { getDatabase } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role: string }

    const db = await getDatabase()
    const usersCollection = db.collection('users')

    const user = await usersCollection.findOne({
      _id: new ObjectId(decoded.userId),
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      )
    }

    const userProfile = {
      _id: user._id.toString(),
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      department: user.department,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString(),
    }

    return NextResponse.json(
      { user: userProfile },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json(
      { error: 'Invalid or expired token' },
      { status: 401 }
    )
  }
}

import { getDatabase } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function POST(request: NextRequest) {
  try {
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }

    const { email, password, fullName, role, department } = body

    if (!email || !password || !fullName || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: email, password, fullName, and role are required' },
        { status: 400 }
      )
    }

    if (typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    let db
    try {
      db = await getDatabase()
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed. Please check your configuration.' },
        { status: 503 }
      )
    }

    const usersCollection = db.collection('users')

    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const now = new Date()

    const result = await usersCollection.insertOne({
      email: email.toLowerCase(),
      password: hashedPassword,
      full_name: fullName,
      role,
      department: department || undefined,
      created_at: now,
      updated_at: now,
    })

    const user = {
      _id: result.insertedId.toString(),
      email: email.toLowerCase(),
      full_name: fullName,
      role,
      department,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    }

    const token = jwt.sign(
      { userId: result.insertedId.toString(), email: email.toLowerCase(), role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json(
      { message: 'Signup successful', user, token },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred during signup'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

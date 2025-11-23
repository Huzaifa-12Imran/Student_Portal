interface ApiOptions extends RequestInit {
  body?: any
}

async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { body, ...fetchOptions } = options

  const response = await fetch(endpoint, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || `API error: ${response.status}`)
  }

  return data
}

export const apiClient = {
  auth: {
    signup: (email: string, password: string, fullName: string, role: string, department?: string) =>
      apiRequest('/api/auth/signup', {
        method: 'POST',
        body: { email, password, fullName, role, department },
      }),

    signin: (email: string, password: string) =>
      apiRequest('/api/auth/signin', {
        method: 'POST',
        body: { email, password },
      }),

    signout: () =>
      apiRequest('/api/auth/signout', {
        method: 'POST',
      }),
  },

  users: {
    getProfile: (userId: string) =>
      apiRequest(`/api/users/profile?userId=${userId}`, {
        method: 'GET',
      }),

    updateProfile: (userId: string, fullName: string, department?: string) =>
      apiRequest('/api/users/profile', {
        method: 'PATCH',
        body: { userId, fullName, department },
      }),
  },

  courses: {
    list: (teacherId?: string) => {
      const url = teacherId
        ? `/api/courses?teacherId=${teacherId}`
        : '/api/courses'
      return apiRequest(url, { method: 'GET' })
    },

    create: (code: string, name: string, teacherId: string, semester: number, description?: string) =>
      apiRequest('/api/courses', {
        method: 'POST',
        body: { code, name, description, teacherId, semester },
      }),
  },

  attendance: {
    list: (studentId?: string, courseId?: string) => {
      const params = new URLSearchParams()
      if (studentId) params.append('studentId', studentId)
      if (courseId) params.append('courseId', courseId)
      const url = params.toString() ? `/api/attendance?${params}` : '/api/attendance'
      return apiRequest(url, { method: 'GET' })
    },

    record: (studentId: string, courseId: string, date: string, status: 'present' | 'absent' | 'late') =>
      apiRequest('/api/attendance', {
        method: 'POST',
        body: { studentId, courseId, date, status },
      }),

    update: (id: string, status: 'present' | 'absent' | 'late') =>
      apiRequest('/api/attendance', {
        method: 'PATCH',
        body: { id, status },
      }),
  },

  grades: {
    list: (studentId?: string, courseId?: string) => {
      const params = new URLSearchParams()
      if (studentId) params.append('studentId', studentId)
      if (courseId) params.append('courseId', courseId)
      const url = params.toString() ? `/api/grades?${params}` : '/api/grades'
      return apiRequest(url, { method: 'GET' })
    },

    record: (studentId: string, courseId: string, marks: number, totalMarks: number) =>
      apiRequest('/api/grades', {
        method: 'POST',
        body: { studentId, courseId, marks, totalMarks },
      }),

    update: (id: string, marks?: number, totalMarks?: number) =>
      apiRequest('/api/grades', {
        method: 'PATCH',
        body: { id, marks, totalMarks },
      }),
  },
}

"use client"

import { Calendar, Clock, MapPin } from "lucide-react"

interface ScheduleItem {
  day: string
  time: string
  course: string
  code: string
  room: string
  type: "lecture" | "lab" | "tutorial"
  instructor: string
}

export default function StudentSchedule() {
  const schedule: ScheduleItem[] = [
    {
      day: "Monday",
      time: "09:00 - 10:30",
      course: "Database Systems",
      code: "CS101",
      room: "Lab 101",
      type: "lab",
      instructor: "Prof. Johnson",
    },
    {
      day: "Monday",
      time: "11:00 - 12:30",
      course: "Web Development",
      code: "CS201",
      room: "Lab 201",
      type: "lab",
      instructor: "Prof. Smith",
    },
    {
      day: "Tuesday",
      time: "10:00 - 11:30",
      course: "Data Structures",
      code: "CS301",
      room: "Lecture Hall 1",
      type: "lecture",
      instructor: "Prof. Williams",
    },
    {
      day: "Wednesday",
      time: "09:00 - 10:30",
      course: "Database Systems",
      code: "CS101",
      room: "Lab 101",
      type: "lab",
      instructor: "Prof. Johnson",
    },
    {
      day: "Thursday",
      time: "14:00 - 15:30",
      course: "Web Development",
      code: "CS201",
      room: "Lab 201",
      type: "lab",
      instructor: "Prof. Smith",
    },
    {
      day: "Friday",
      time: "10:00 - 11:30",
      course: "Data Structures",
      code: "CS301",
      room: "Lecture Hall 1",
      type: "lecture",
      instructor: "Prof. Williams",
    },
  ]

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-blue-500/20 border-blue-500/30 text-blue-400"
      case "lab":
        return "bg-green-500/20 border-green-500/30 text-green-400"
      case "tutorial":
        return "bg-purple-500/20 border-purple-500/30 text-purple-400"
      default:
        return "bg-slate-500/20 border-slate-500/30 text-slate-400"
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-1">Class Schedule</h2>
        <p className="text-slate-400 text-sm">Your weekly class timetable and venue information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-400 text-sm font-medium">Total Classes: {schedule.length} per week</p>
        </div>
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-400 text-sm font-medium">Working Days: {days.length} • Weekly Hours: {schedule.length * 1.5}</p>
        </div>
      </div>

      <div className="space-y-4">
        {schedule.map((item, idx) => (
          <div
            key={idx}
            className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 hover:border-slate-700/50 transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-semibold text-blue-400">{item.day}</p>
                      <p className="text-xs text-slate-400">Day</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.course}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span>{item.room}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:items-end">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-medium border ${getTypeColor(item.type)}`}
                >
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Instructor</p>
                  <p className="text-sm font-medium text-slate-300">{item.instructor}</p>
                </div>
                <span className="px-3 py-1 bg-slate-700/30 border border-slate-600/30 rounded-lg text-xs font-medium text-slate-400">
                  {item.code}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <p className="text-sm font-medium text-slate-400">Lectures</p>
          </div>
          <p className="text-2xl font-bold text-blue-400">{schedule.filter(s => s.type === "lecture").length}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <p className="text-sm font-medium text-slate-400">Labs</p>
          </div>
          <p className="text-2xl font-bold text-green-400">{schedule.filter(s => s.type === "lab").length}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-purple-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <p className="text-sm font-medium text-slate-400">Tutorials</p>
          </div>
          <p className="text-2xl font-bold text-purple-400">{schedule.filter(s => s.type === "tutorial").length}</p>
        </div>
      </div>
    </div>
  )
}

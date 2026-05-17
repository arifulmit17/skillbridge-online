"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"

import { getAllSessions } from "@/services/booking.service"
import { getAllCategories } from "@/services/categories.service"
import { getAllReviews } from "@/services/reviews.service"

import { useEffect, useState } from "react"
import { getAllUser } from "@/services/user.service"


export const dynamic = "force-dynamic"

export default function AdminDashboard() {

  const [users,setUsers]=useState<any>(null)
  const [sessions,setSessions]=useState<any>(null)
  const [categories,setCategories]=useState<any>(null)
  const [reviews,setReviews]=useState<any>(null)

  useEffect(()=>{
    const fetchUsers = async () => {
      const users = await getAllUser();
      console.log(users);
      setUsers(users?.data);
    }
    fetchUsers();
  },[])

  console.log("users",users)

  const tutors =
    users?.data?.filter(
      (user: any) =>
        user?.role === "tutor"
    ) || []

  const students =
    users?.data?.filter(
      (user: any) =>
        user?.role === "student" ||
        user?.role === "Student"
    ) || []

  useEffect(()=>{
    const fetchSessions = async () => {
      const res = await getAllSessions();
      setSessions(res);
    }
    fetchSessions();
  },[])

  const sessionLength = Array.isArray(
    sessions
  )
    ? sessions.length
    : 0

  useEffect(()=>{
    const fetchCategories = async () => {
      const res = await getAllCategories();
      setCategories(res?.data);
    }
    fetchCategories();
  },[users])

  const categoryLength = Array.isArray(
    categories
  )
    ? categories.length
    : 0

  useEffect(()=>{
    const fetchReviews = async () => {
      const res = await getAllReviews();
      setReviews(res?.data);
    }
    fetchReviews();
  },[users])

  const reviewLength = Array.isArray(
    reviews
  )
    ? reviews.length
    : 0

  // BAR CHART DATA
  const barData = [
    {
      name: "Users",
      value: users?.data?.length || 0,
    },
    {
      name: "Tutors",
      value: tutors.length,
    },
    {
      name: "Students",
      value: students.length,
    },
    {
      name: "Sessions",
      value: sessionLength,
    },
    {
      name: "Categories",
      value: categoryLength,
    },
    {
      name: "Reviews",
      value: reviewLength,
    },
  ]

  // PIE CHART DATA
  const pieData = [
    {
      name: "Tutors",
      value: tutors.length,
    },
    {
      name: "Students",
      value: students.length,
    },
  ]

  const COLORS = [
    "#2563eb",
    "#60a5fa",
  ]

  return (
    <div className="space-y-8">
      
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {barData.map((item) => (
          <Card
            key={item.name}
            className="rounded-2xl"
          >
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Total {item.name}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {item.value}
              </h2>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* BAR CHART */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>
              Platform Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[400px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PIE CHART */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>
              User Distribution
            </CardTitle>
          </CardHeader>

          <CardContent className="h-[400px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label
                >
                  {pieData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
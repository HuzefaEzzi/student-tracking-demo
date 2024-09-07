/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, AlertTriangle } from 'lucide-react'

// Generate dummy data for 100 students
const generateDummyData = (count: number) => {
  const students = [];
  for (let i = 1; i <= count; i++) {
    students.push({
      id: i,
      name: `Student ${i}`,
      alerts: {
        classTimeActivity: Math.random() < 0.2,
        noRecentActivity: Math.random() < 0.1,
        restrictedWebsites: Math.random() < 0.15,
        vlcOveruse: Math.random() < 0.1
      },
      appUsage: [
        { APPID: 'Chrome', count: Math.floor(Math.random() * 100), hours: Math.round(Math.random() * 5 * 10) / 10 },
        { APPID: 'Word', count: Math.floor(Math.random() * 50), hours: Math.round(Math.random() * 3 * 10) / 10 },
        { APPID: 'Excel', count: Math.floor(Math.random() * 30), hours: Math.round(Math.random() * 2 * 10) / 10 },
        { APPID: 'VLC', count: Math.floor(Math.random() * 20), hours: Math.round(Math.random() * 4 * 10) / 10 },
        { APPID: 'Zoom', count: Math.floor(Math.random() * 10), hours: Math.round(Math.random() * 2 * 10) / 10 }
      ],
      webUsage: [
        { URL: 'google.com', count: Math.floor(Math.random() * 100) },
        { URL: 'youtube.com', count: Math.floor(Math.random() * 75) },
        { URL: 'github.com', count: Math.floor(Math.random() * 50) },
        { URL: 'stackoverflow.com', count: Math.floor(Math.random() * 40) },
        { URL: 'netflix.com', count: Math.floor(Math.random() * 30) }
      ],
      userEvents: [
        { EVENT: 'Login', count: Math.floor(Math.random() * 10) },
        { EVENT: 'Logout', count: Math.floor(Math.random() * 8) },
        { EVENT: 'File Download', count: Math.floor(Math.random() * 25) },
        { EVENT: 'File Upload', count: Math.floor(Math.random() * 15) },
        { EVENT: 'Print', count: Math.floor(Math.random() * 5) }
      ]
    });
  }
  return students;
};

const dummyData = {
  students: generateDummyData(100)
};

// Define the Student interface
interface Student {
  id: number;
  name: string;
  alerts: {
    classTimeActivity: boolean;
    noRecentActivity: boolean;
    restrictedWebsites: boolean;
    vlcOveruse: boolean;
  };
  appUsage: Array<{ APPID: string; count: number; hours: number }>;
  webUsage: Array<{ URL: string; count: number }>;
  userEvents: Array<{ EVENT: string; count: number }>;
}

const StudentDetails: React.FC<{ student: Student }> = ({ student }) => (
  <ScrollArea className="h-[80vh]">
    {/* Alerts Section */}
    <div className="space-y-4 mb-6">
      <h2 className="text-2xl font-semibold">Alerts for {student.name}</h2>
      {student.alerts.classTimeActivity && (
        <Alert>
          <AlertTitle>Class Time Activity Detected</AlertTitle>
          <AlertDescription>{student.name} has activity detected during class hours (8 AM - 1 PM).</AlertDescription>
        </Alert>
      )}
      {student.alerts.noRecentActivity && (
        <Alert>
          <AlertTitle>No Recent Activity</AlertTitle>
          <AlertDescription>{student.name} has no activity detected for the past 6 days.</AlertDescription>
        </Alert>
      )}
      {student.alerts.restrictedWebsites && (
        <Alert>
          <AlertTitle>Restricted Website Access</AlertTitle>
          <AlertDescription>{student.name} has accessed restricted websites (e.g., Netflix, Facebook).</AlertDescription>
        </Alert>
      )}
      {student.alerts.vlcOveruse && (
        <Alert>
          <AlertTitle>VLC Overuse</AlertTitle>
          <AlertDescription>{student.name}&apos;s VLC usage has exceeded 3 hours today.</AlertDescription>
        </Alert>
      )}
    </div>

    {/* App Usage Section */}
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>App Usage for {student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Usage Count</TableHead>
              <TableHead>Usage Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {student.appUsage.map((app, index) => (
              <TableRow key={index}>
                <TableCell>{app.APPID}</TableCell>
                <TableCell>{app.count}</TableCell>
                <TableCell>{app.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* Web Usage Section */}
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Top 5 Visited Websites for {student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Visit Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {student.webUsage.map((website, index) => (
              <TableRow key={index}>
                <TableCell>{website.URL}</TableCell>
                <TableCell>{website.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* User Events Section */}
    <Card>
      <CardHeader>
        <CardTitle>User Events for {student.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {student.userEvents.map((event, index) => (
              <TableRow key={index}>
                <TableCell>{event.EVENT}</TableCell>
                <TableCell>{event.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </ScrollArea>
);

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  // Remove the unused 'selectedStudent' state
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const [, setSelectedStudent] = useState<any>(null);

  const filteredStudents = dummyData.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      <h1 className="text-3xl font-bold">Student Activity Dashboard</h1>

      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Students Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead>Top App (Usage)</TableHead>
                <TableHead>Top Website (Visits)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const topApp = student.appUsage.reduce((prev, current) => (prev.count > current.count) ? prev : current);
                const topWebsite = student.webUsage.reduce((prev, current) => (prev.count > current.count) ? prev : current);
                return (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      {Object.values(student.alerts).some(alert => alert) && (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      )}
                    </TableCell>
                    <TableCell>{topApp.APPID} ({topApp.count})</TableCell>
                    <TableCell>{topWebsite.URL} ({topWebsite.count})</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedStudent(student as any)}>View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{student.name}&apos;s Activity Details</DialogTitle>
                          </DialogHeader>
                          <StudentDetails student={student} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
// pages/main-page.tsx
import React from 'react';
import { timetable } from '../lib/timetableData';

const DAYS = ['월', '화', '수', '목', '금'] as const;
const START_HOUR = 9;
const END_HOUR = 21;
const TIME_INTERVAL = 15;

function timeToMinutes(time: string): number {
  const [hh, mm] = time.split(':').map(Number);
  return hh * 60 + mm;
}

function getRow(time: string): number {
  const mins = timeToMinutes(time);
  const index = Math.floor((mins - START_HOUR * 60) / TIME_INTERVAL);
  return index + 2; // Row 1은 헤더
}

export default function MainPage() {
  // 시간 라벨 생성 (매시 정각)
  const timeLabels = [];
  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    const row = getRow(timeStr);
    timeLabels.push(
      <div key={timeStr} className="time-slot" style={{ gridColumn: 1, gridRow: row }}>
        {timeStr}
      </div>
    );
  }

  // 과목 블록 생성
  const scheduleBlocks = timetable.flatMap((subject) =>
    subject.times.map((time) => {
      const dayIndex = DAYS.indexOf(time.day);
      if (dayIndex === -1) return null;
      const col = dayIndex + 2;
      const startRow = getRow(time.startTime);
      const endRow = getRow(time.endTime);
      return (
        <div
          key={`${subject.id}-${time.day}`}
          className={`schedule-block ${subject.color}`}
          style={{ gridColumn: col, gridRow: `${startRow} / ${endRow}` }}
        >
          <div>{subject.subject}</div>
          <div>{subject.professor}</div>
          <div>{subject.location}</div>
          <div>
            {time.startTime} ~ {time.endTime}
          </div>
        </div>
      );
    })
  ).filter(Boolean);

  return (
    <div className="timetable-container">
      <h2 className="timetable-title">2025년 1학기 시간표</h2>
      <div className="timetable">
        <div className="header" style={{ gridColumn: 1, gridRow: 1 }}>
          시간
        </div>
        {DAYS.map((day, index) => (
          <div
            key={day}
            className="header"
            style={{ gridColumn: index + 2, gridRow: 1 }}
          >
            {day}
          </div>
        ))}
        {timeLabels}
        {scheduleBlocks}
      </div>
    </div>
  );
}
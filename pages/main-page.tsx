// pages/main-page.tsx
import React from 'react';
import { timetable } from '../lib/timetableData';
import styles from '../styles/main-page.module.css';

const DAYS = ['월', '화', '수', '목', '금'] as const;
const START_HOUR = 9;
const END_HOUR = 21;
const TIME_INTERVAL = 15;

function timeToMinutes(time: string): number {
  const [hh, mm] = time.split(':').map(Number);
  if (isNaN(hh) || isNaN(mm) || hh < 0 || hh >= 24 || mm < 0 || mm >= 60) {
    console.error(`Invalid time format: "${time}"`);
    return START_HOUR * 60;
  }
  return hh * 60 + mm;
}

function getStartRow(time: string): number {
  const mins = timeToMinutes(time);
  const index = Math.floor((mins - START_HOUR * 60) / TIME_INTERVAL);
  return index + 2;
}

function getEndRow(time: string): number {
  const mins = timeToMinutes(time);
  const index = Math.ceil((mins - START_HOUR * 60) / TIME_INTERVAL);
  return index + 2;
}

export default function MainPage() {
  const timeLabels = [];
  for (let hour = START_HOUR; hour <= END_HOUR; hour++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    const row = getStartRow(timeStr);
    timeLabels.push(
      <div
        key={timeStr}
        className={styles.timeSlot}
        style={{ gridColumn: 1, gridRow: row }}
      >
        {timeStr}
      </div>
    );
  }

  const scheduleBlocks = timetable.flatMap((subject) =>
    subject.times.map((time) => {
      const dayIndex = DAYS.indexOf(time.day);
      if (dayIndex === -1) {
        console.warn(`Invalid day "${time.day}" for subject: ${subject.subject}`);
        return null;
      }
      const col = dayIndex + 2;
      const startRow = getStartRow(time.startTime);
      const endRow = getEndRow(time.endTime);
      if (startRow >= endRow) {
        console.warn(`Invalid time range for ${subject.subject}: ${time.startTime} to ${time.endTime}`);
        return null;
      }
      return (
        <div
          key={`${subject.id}-${time.day}`}
          className={`${styles.scheduleBlock} ${styles[subject.color]}`}
          style={{ gridColumn: col, gridRow: `${startRow} / ${endRow}` }}
          title={`${subject.subject} - ${subject.professor} - ${subject.location}`}
        >
          <div className={styles.scheduleBlockTitle}>{subject.subject}</div>
          <div className={styles.scheduleBlockDetails}>{subject.professor}</div>
          <div className={styles.scheduleBlockDetails}>{subject.location}</div>
          <div className={styles.scheduleBlockTime}>{`${time.startTime} ~ ${time.endTime}`}</div>
        </div>
      );
    })
  ).filter(Boolean);

  return (
    <div className={styles.timetableContainer}>
      <h2 className={styles.timetableTitle}>2025년 1학기 시간표</h2>
      <div className={styles.timetable}>
        <div className={styles.header} style={{ gridColumn: 1, gridRow: 1 }}>
          시간
        </div>
        {DAYS.map((day, index) => (
          <div
            key={day}
            className={styles.header}
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
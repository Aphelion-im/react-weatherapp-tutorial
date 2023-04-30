'use strict';

export default function createDateAndTime() {
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth(); // Zero index based array
  const currentYear = date.getFullYear();
  const currentDate = `${currentDay}-${currentMonth + 1}-${currentYear}`;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentTime = `${hours}:${minutes}`;
  return currentDate + ' ' + currentTime;
}
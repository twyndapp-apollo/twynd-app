/**
 * Twynd App - Shared Utilities
 * Helper functions used across the app
 */

import { ZODIAC_SIGNS } from './constants';

/**
 * Calculate zodiac sign from birth date
 */
export function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const zodiacDates: Array<[number, number, string]> = [
    [3, 21, ZODIAC_SIGNS[0]], // Aries
    [4, 20, ZODIAC_SIGNS[1]], // Taurus
    [5, 21, ZODIAC_SIGNS[2]], // Gemini
    [6, 21, ZODIAC_SIGNS[3]], // Cancer
    [7, 23, ZODIAC_SIGNS[4]], // Leo
    [8, 23, ZODIAC_SIGNS[5]], // Virgo
    [9, 23, ZODIAC_SIGNS[6]], // Libra
    [10, 23, ZODIAC_SIGNS[7]], // Scorpio
    [11, 22, ZODIAC_SIGNS[8]], // Sagittarius
    [12, 22, ZODIAC_SIGNS[9]], // Capricorn
    [1, 20, ZODIAC_SIGNS[10]], // Aquarius
    [2, 19, ZODIAC_SIGNS[11]], // Pisces
  ];

  for (let i = 0; i < zodiacDates.length; i++) {
    const [startMonth, startDay, sign] = zodiacDates[i];
    const nextSign = zodiacDates[(i + 1) % zodiacDates.length];
    const [endMonth, endDay] = nextSign;

    if (month === startMonth && day >= startDay) {
      if (month === endMonth ? day <= endDay : true) {
        return sign;
      }
    } else if (month === endMonth && day <= endDay) {
      return sign;
    }
  }

  return ZODIAC_SIGNS[0]; // Default to Aries
}

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date, format: 'short' | 'long' = 'long'): string {
  const options: Intl.DateTimeFormatOptions =
    format === 'short'
      ? { month: 'short', day: 'numeric' }
      : { month: 'long', day: 'numeric', year: 'numeric' };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Calculate days between two dates
 */
export function daysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.floor(Math.abs((date2.getTime() - date1.getTime()) / oneDay));
}

/**
 * Generate a random room code
 */
export function generateRoomCode(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate QR code URL using external service
 */
export function generateQRCodeUrl(text: string, size: number = 300): string {
  // Using QR server API (free)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate nickname
 */
export function isValidNickname(nickname: string, minLength: number = 2, maxLength: number = 50): boolean {
  return nickname.length >= minLength && nickname.length <= maxLength;
}

/**
 * Truncate text to max length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Format time relative to now (e.g., "2 hours ago")
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: Array<[number, string]> = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];

  for (const [secondsInInterval, unitName] of intervals) {
    const interval = Math.floor(seconds / secondsInInterval);
    if (interval >= 1) {
      return `${interval} ${unitName}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

/**
 * Calculate relationship duration in days
 */
export function getRelationshipDuration(startDate: Date): {
  days: number;
  weeks: number;
  months: number;
  milestone: string;
} {
  const now = new Date();
  const days = daysBetween(startDate, now);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  let milestone = '';
  if (days === 7) milestone = '7 Days Together!';
  else if (days === 30) milestone = '1 Month Together!';
  else if (days === 100) milestone = '100 Days Together!';
  else if (months === 6) milestone = '6 Months Together!';
  else if (months === 12) milestone = '1 Year Together!';

  return { days, weeks, months, milestone };
}

/**
 * Format relationship duration for display
 */
export function formatRelationshipDuration(startDate: Date): string {
  const { days, weeks, months } = getRelationshipDuration(startDate);

  if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  } else if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  } else {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
}

/**
 * Get color for metric rating (arrow direction becomes color)
 */
export function getMetricColor(trend: 'up' | 'right' | 'down'): string {
  switch (trend) {
    case 'up':
      return '#4CAF50'; // Green - improving
    case 'down':
      return '#FF5252'; // Red - declining
    case 'right':
      return '#2196F3'; // Blue - stable
    default:
      return '#808080'; // Gray - neutral
  }
}

/**
 * Parse room code from QR code data
 */
export function parseRoomCodeFromQR(qrData: string): string | null {
  // Expected format: twynd://room/{code}
  const match = qrData.match(/twynd:\/\/room\/([A-Z0-9]+)/);
  return match ? match[1] : null;
}

/**
 * Generate room QR data
 */
export function generateRoomQRData(roomCode: string): string {
  return `twynd://room/${roomCode}`;
}

/**
 * Validate birth date (not future, reasonable age)
 */
export function isValidBirthDate(date: Date): boolean {
  const now = new Date();
  if (date > now) return false; // Future date

  const age = calculateAge(date);
  return age >= 13 && age <= 120; // Reasonable age range
}

/**
 * Get initials from nickname
 */
export function getInitials(nickname: string): string {
  return nickname
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate avatar placeholder color based on nickname
 */
export function getAvatarColor(nickname: string): string {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) {
    hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52A1D4', '#EC7063', '#76D7C4',
  ];

  return colors[Math.abs(hash % colors.length)];
}

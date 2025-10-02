import { format, formatDistance } from 'date-fns';

/**
 * Format timestamp เป็น HH:mm
 */
export const formatTime = (timestamp) => {
  try {
    return format(new Date(timestamp), 'HH:mm');
  } catch (error) {
    return '--:--';
  }
};

/**
 * Format timestamp เป็น DD/MM/YYYY HH:mm
 */
export const formatDateTime = (timestamp) => {
  try {
    return format(new Date(timestamp), 'dd/MM/yyyy HH:mm');
  } catch (error) {
    return 'Invalid date';
  }
};

/**
 * แสดงเวลาแบบ relative (เมื่อไหร่)
 */
export const formatTimeAgo = (timestamp) => {
  try {
    if (!timestamp) return 'unknown';
    return formatDistance(new Date(timestamp), new Date(), {
      addSuffix: true
    });
  } catch (error) {
    return 'unknown';
  }
};
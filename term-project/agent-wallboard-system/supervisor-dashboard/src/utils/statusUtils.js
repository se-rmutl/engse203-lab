import { 
  CheckCircle,  // Available
  Cancel,       // Busy
  Pause,        // Break
  PowerOff      // Offline
} from '@mui/icons-material';

/**
 * ดึงสี status
 */
export const getStatusColor = (status) => {
  const colors = {
    Available: '#4caf50',
    Busy: '#ff9800',
    Break: '#2196f3',
    Offline: '#9e9e9e'
  };
  return colors[status] || colors.Offline;
};

/**
 * ดึง icon component สำหรับ status
 */
export const getStatusIcon = (status) => {
  const icons = {
    Available: CheckCircle,
    Busy: Cancel,
    Break: Pause,
    Offline: PowerOff
  };
  return icons[status] || PowerOff;
};

/**
 * ดึง label ของ status
 */
export const getStatusLabel = (status) => {
  return status || 'Unknown';
};
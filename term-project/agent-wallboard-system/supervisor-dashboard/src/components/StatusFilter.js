import React from 'react';
import { Box, Button, Chip } from '@mui/material';
import { 
  ViewModule, CheckCircle, Cancel, Pause, PowerOff 
} from '@mui/icons-material';

function StatusFilter({ currentFilter, onFilterChange, stats }) {
  // กำหนด filter buttons
  const filterButtons = [
    {
      value: 'All',
      label: 'All Agents',
      icon: ViewModule,
      count: stats.total,
      color: '#1976d2'
    },
    {
      value: 'Available',
      label: 'Available',
      icon: CheckCircle,
      count: stats.available,
      color: '#4caf50'
    },
    {
      value: 'Busy',
      label: 'Busy',
      icon: Cancel,
      count: stats.busy,
      color: '#ff9800'
    },
    {
      value: 'Break',
      label: 'Break',
      icon: Pause,
      count: stats.break,
      color: '#2196f3'
    },
    {
      value: 'Offline',
      label: 'Offline',
      icon: PowerOff,
      count: stats.offline,
      color: '#9e9e9e'
    }
  ];

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        gap: 1, 
        flexWrap: 'wrap',
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1
      }}
    >
      {filterButtons.map((filter) => {
        const IconComponent = filter.icon;
        const isActive = currentFilter === filter.value;

        return (
          <Button
            key={filter.value}
            variant={isActive ? 'contained' : 'outlined'}
            onClick={() => onFilterChange(filter.value)}
            startIcon={<IconComponent />}
            sx={{
              borderColor: filter.color,
              color: isActive ? 'white' : filter.color,
              bgcolor: isActive ? filter.color : 'transparent',
              '&:hover': {
                bgcolor: isActive ? filter.color : `${filter.color}20`,
                borderColor: filter.color
              }
            }}
          >
            {filter.label}
            <Chip
              label={filter.count}
              size="small"
              sx={{
                ml: 1,
                bgcolor: isActive ? 'rgba(255,255,255,0.3)' : 'transparent',
                color: isActive ? 'white' : filter.color,
                fontWeight: 'bold'
              }}
            />
          </Button>
        );
      })}
    </Box>
  );
}

export default StatusFilter;
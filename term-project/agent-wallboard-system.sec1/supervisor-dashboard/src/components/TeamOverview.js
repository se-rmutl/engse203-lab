import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { 
  People, CheckCircle, Cancel, Pause, PowerOff 
} from '@mui/icons-material';

function TeamOverview({ stats }) {
  // กำหนด cards ที่จะแสดง
  const overviewCards = [
    {
      label: 'Total Agents',
      value: stats.total,
      icon: People,
      color: '#1976d2'
    },
    {
      label: 'Online',
      value: stats.online,
      icon: PowerOff,
      color: '#4caf50'
    },
    {
      label: 'Available',
      value: stats.available,
      icon: CheckCircle,
      color: '#4caf50'
    },
    {
      label: 'Busy',
      value: stats.busy,
      icon: Cancel,
      color: '#ff9800'
    },
    {
      label: 'On Break',
      value: stats.break,
      icon: Pause,
      color: '#2196f3'
    },
    {
      label: 'Offline',
      value: stats.offline,
      icon: PowerOff,
      color: '#9e9e9e'
    }
  ];

  return (
    <Grid container spacing={2}>
      {overviewCards.map((card, index) => {
        const IconComponent = card.icon;
        
        return (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Card elevation={2}>
              <CardContent>
                {/* Icon */}
                <Box display="flex" justifyContent="center" mb={1}>
                  <IconComponent sx={{ fontSize: 40, color: card.color }} />
                </Box>
                
                {/* Value */}
                <Typography 
                  variant="h4" 
                  align="center" 
                  sx={{ fontWeight: 'bold', color: card.color }}
                >
                  {card.value}
                </Typography>
                
                {/* Label */}
                <Typography 
                  variant="body2" 
                  align="center" 
                  color="text.secondary"
                >
                  {card.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default TeamOverview;
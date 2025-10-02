import React, { useState } from 'react';
import {
    Grid, AppBar, Toolbar, Typography, Button, Box,
    Chip, IconButton, Tooltip
} from '@mui/material';
import {
    Logout, People, Message, Refresh, Circle
} from '@mui/icons-material';
import TeamOverview from './TeamOverview';
import AgentCard from './AgentCard';
import MessagePanel from './MessagePanel';
import StatusFilter from './StatusFilter';

function Dashboard({
    supervisor,
    teamData,
    messages,
    socketConnected,
    onSendMessage,
    onLogout
}) {
    // State
    const [statusFilter, setStatusFilter] = useState('All');
    const [showMessagePanel, setShowMessagePanel] = useState(false);

    // ===========================================
    // คำนวณข้อมูล
    // ===========================================

    // กรองข้อมูล agent ตาม status filter
    const filteredAgents = teamData.filter(agent =>
        statusFilter === 'All' || agent.currentStatus === statusFilter
    );

    // สถิติทีม
    const teamStats = {
        total: teamData.length,
        online: teamData.filter(a => a.isOnline).length,
        available: teamData.filter(a => a.currentStatus === 'Available').length,
        busy: teamData.filter(a => a.currentStatus === 'Busy').length,
        break: teamData.filter(a => a.currentStatus === 'Break').length,
        offline: teamData.filter(a => a.currentStatus === 'Offline').length
    };

    // ===========================================
    // Handlers
    // ===========================================

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <Box>
            {/* App Bar (Header) */}
            <AppBar position="static" elevation={1}>
                <Toolbar>
                    {/* Team Icon */}
                    <People sx={{ mr: 1 }} />

                    {/* Supervisor Name & Team */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">
                            {supervisor.name}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {supervisor.teamName}
                        </Typography>
                    </Box>

                    {/* Connection Status */}
                    <Tooltip title={socketConnected ? 'Connected' : 'Disconnected'}>
                        <Circle
                            sx={{
                                fontSize: 12,
                                color: socketConnected ? 'success.light' : 'error.light',
                                mr: 2
                            }}
                        />
                    </Tooltip>

                    {/* Online Count */}
                    <Chip
                        label={`${teamStats.online}/${teamStats.total} Online`}
                        color="success"
                        variant="outlined"
                        sx={{ mr: 2, color: 'white', borderColor: 'white' }}
                    />

                    {/* Message Button */}
                    <Button
                        color="inherit"
                        startIcon={<Message />}
                        onClick={() => setShowMessagePanel(true)}
                        sx={{ mr: 1 }}
                    >
                        Send Message
                    </Button>

                    {/* Refresh Button */}
                    <Tooltip title="Refresh">
                        <IconButton color="inherit" onClick={handleRefresh}>
                            <Refresh />
                        </IconButton>
                    </Tooltip>

                    {/* Logout Button */}
                    <Button
                        color="inherit"
                        startIcon={<Logout />}
                        onClick={onLogout}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Dashboard Content */}
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    {/* Team Overview */}
                    <Grid item xs={12}>
                        <TeamOverview stats={teamStats} />
                    </Grid>

                    {/* Status Filter */}
                    <Grid item xs={12}>
                        <StatusFilter
                            currentFilter={statusFilter}
                            onFilterChange={setStatusFilter}
                            stats={teamStats}
                        />
                    </Grid>

                    {/* Agent Cards Grid */}
                    <Grid item xs={12}>
                        {filteredAgents.length > 0 ? (
                            <Grid container spacing={2}>
                                {filteredAgents.map(agent => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={agent.agentCode}>
                                        <AgentCard
                                            agent={agent}
                                            onSendMessage={(content) => onSendMessage({
                                                type: 'direct',
                                                toCode: agent.agentCode,
                                                content
                                            })}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box textAlign="center" py={5}>
                                <Typography variant="h6" color="text.secondary">
                                    No agents found with status: {statusFilter}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>

            {/* Message Panel Modal */}
            <MessagePanel
                open={showMessagePanel}
                onClose={() => setShowMessagePanel(false)}
                supervisor={supervisor}  // ✅ ส่ง supervisor prop
                teamData={safeTeamData}
                onSendMessage={onSendMessage}
            />
        </Box>
    );
}

export default Dashboard;
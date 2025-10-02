import React, { useState } from 'react';
import {
    Card, CardContent, Typography, Chip, Button, Box,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField,
    Tooltip
} from '@mui/material';
import { Person, AccessTime, Message, Circle } from '@mui/icons-material';
import { getStatusColor, getStatusIcon } from '../utils/statusUtils';
import { formatTimeAgo } from '../utils/dateFormat';

function AgentCard({ agent, onSendMessage }) {
    // State สำหรับ message dialog
    const [messageDialog, setMessageDialog] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    // ===========================================
    // Handlers
    // ===========================================

    const handleSendMessage = () => {
        if (messageContent.trim()) {
            onSendMessage(messageContent);
            setMessageContent('');
            setMessageDialog(false);
        }
    };

    // ===========================================
    // UI Properties
    // ===========================================

    const StatusIcon = getStatusIcon(agent.currentStatus);
    const statusColor = getStatusColor(agent.currentStatus);

    return (
        <>
            {/* Agent Card */}
            <Card
                elevation={2}
                sx={{
                    border: `2px solid ${agent.isOnline ? statusColor : '#ccc'}`,
                    opacity: agent.isOnline ? 1 : 0.7,
                    transition: 'all 0.3s'
                }}
            >
                <CardContent>
                    {/* Agent Info Row */}
                    <Box display="flex" alignItems="center" mb={2}>
                        {/* Avatar Icon */}
                        <Person sx={{ mr: 1, color: 'text.secondary' }} />

                        {/* Name & Code */}
                        <Box flexGrow={1}>
                            <Typography variant="h6" noWrap>
                                {agent.agentName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {agent.agentCode}
                            </Typography>
                        </Box>

                        {/* Online Indicator */}
                        {agent.isOnline && (
                            <Tooltip title="Online">
                                <Circle sx={{ fontSize: 12, color: 'success.main' }} />
                            </Tooltip>
                        )}
                    </Box>

                    {/* Current Status */}
                    <Box display="flex" alignItems="center" mb={2}>
                        <StatusIcon sx={{ mr: 1, color: statusColor }} />
                        <Chip
                            label={agent.currentStatus}
                            size="small"
                            sx={{
                                backgroundColor: statusColor,
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        />
                    </Box>

                    {/* Last Update Time */}
                    <Box display="flex" alignItems="center" mb={2}>
                        <AccessTime sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {agent.isOnline
                                ? `Updated ${formatTimeAgo(agent.lastUpdate)}`
                                : `Last seen ${formatTimeAgo(agent.lastSeen)}`
                            }
                        </Typography>
                    </Box>

                    {/* Actions */}
                    <Box display="flex" justifyContent="space-between">
                        <Button
                            size="small"
                            startIcon={<Message />}
                            onClick={() => setMessageDialog(true)}
                            disabled={!agent.isOnline}
                        >
                            Message
                        </Button>

                        <Chip
                            size="small"
                            label={agent.isOnline ? 'Online' : 'Offline'}
                            color={agent.isOnline ? 'success' : 'default'}
                            variant="outlined"
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* Send Message Dialog */}
            <Dialog
                open={messageDialog}
                onClose={() => setMessageDialog(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Send Message to {agent.agentName}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        margin="normal"
                        placeholder="Type your message here..."
                        autoFocus
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMessageDialog(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSendMessage}
                        variant="contained"
                        disabled={!messageContent.trim()}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AgentCard;
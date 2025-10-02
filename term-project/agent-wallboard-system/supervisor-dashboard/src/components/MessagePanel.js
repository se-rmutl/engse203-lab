/**
 * MESSAGE PANEL COMPONENT
 * Modal สำหรับส่งข้อความ Direct หรือ Broadcast
 * - เลือกประเภท: Direct (คนเดียว) หรือ Broadcast (ทั้งทีม)
 * - เลือก agent (ถ้าเป็น direct)
 * - กรอกข้อความ
 * - ส่งข้อความ
 * 
 * FIX: เพิ่ม supervisor prop เพื่อใช้ teamId สำหรับ broadcast
 */

import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, RadioGroup, FormControlLabel, Radio,
    FormControl, FormLabel, Select, MenuItem, InputLabel,
    Box, Typography, Alert
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { validateMessage } from '../utils/validation';

function MessagePanel({ open, onClose, supervisor, teamData, onSendMessage }) {
    const [messageType, setMessageType] = useState('direct');
    const [selectedAgent, setSelectedAgent] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [error, setError] = useState('');

    // Debug logging เมื่อเปิด modal
    useEffect(() => {
        if (open) {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📧 [MESSAGE PANEL OPENED]');
            console.log('Supervisor:', supervisor);
            console.log('Team ID:', supervisor?.teamId);
            console.log('Team Name:', supervisor?.teamName);
            console.log('Team Data:', teamData?.length, 'agents');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        }
    }, [open, supervisor, teamData]);

    const handleTypeChange = (e) => {
        setMessageType(e.target.value);
        setSelectedAgent('');
        setError('');
    };

    const handleSend = () => {
        setError('');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📤 [SENDING MESSAGE]');

        // Validate message content
        const validationError = validateMessage(messageContent);
        if (validationError) {
            setError(validationError);
            console.error('❌ Validation error:', validationError);
            return;
        }

        // Validate direct message selection
        if (messageType === 'direct' && !selectedAgent) {
            setError('Please select an agent');
            console.error('❌ No agent selected');
            return;
        }

        // สร้าง message object
        const messageData = {
            content: messageContent.trim(),
            type: messageType,
            priority: 'normal'
        };

        // เพิ่ม recipient
        if (messageType === 'direct') {
            messageData.toCode = selectedAgent;
            console.log('✅ Direct message to:', selectedAgent);
        } else {
            // Broadcast - ต้องมี teamId
            if (!supervisor || !supervisor.teamId) {
                console.error('❌ Missing supervisor or teamId');
                console.error('   Supervisor:', supervisor);
                setError('Cannot determine team ID for broadcast message');
                return;
            }

            messageData.toTeamId = supervisor.teamId;
            console.log('✅ Broadcast to team:', supervisor.teamId, `(${supervisor.teamName})`);
        }

        console.log('Message data:', messageData);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        // ส่งข้อความ
        onSendMessage(messageData);

        // Reset และปิด
        setMessageContent('');
        setSelectedAgent('');
        setMessageType('direct');
        setError('');
        onClose();
    };

    const handleCancel = () => {
        setMessageContent('');
        setSelectedAgent('');
        setMessageType('direct');
        setError('');
        onClose();
    };

    // Filter online agents
    const onlineAgents = teamData ? teamData.filter(agent => agent.isOnline) : [];
    const totalAgents = teamData ? teamData.length : 0;

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Send Message
            </DialogTitle>

            <DialogContent>
                {/* Message Type Selection */}
                <FormControl component="fieldset" sx={{ mb: 3, mt: 1 }}>
                    <FormLabel component="legend">Message Type</FormLabel>
                    <RadioGroup
                        row
                        value={messageType}
                        onChange={handleTypeChange}
                    >
                        <FormControlLabel
                            value="direct"
                            control={<Radio />}
                            label="Direct (to one agent)"
                        />
                        <FormControlLabel
                            value="broadcast"
                            control={<Radio />}
                            label="Broadcast (to all team)"
                        />
                    </RadioGroup>
                </FormControl>

                {/* Agent Selection (Direct) */}
                {messageType === 'direct' && (
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Select Agent</InputLabel>
                        <Select
                            value={selectedAgent}
                            onChange={(e) => setSelectedAgent(e.target.value)}
                            label="Select Agent"
                        >
                            {onlineAgents.length > 0 ? (
                                onlineAgents.map(agent => (
                                    <MenuItem key={agent.agentCode} value={agent.agentCode}>
                                        {agent.agentName} ({agent.agentCode}) - {agent.currentStatus}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No agents online</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                )}

                {/* Broadcast Info */}
                {messageType === 'broadcast' && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                        This message will be sent to all agents in your team
                        {supervisor?.teamName && <> ({supervisor.teamName})</>}
                        <br />
                        {totalAgents} agents total, {onlineAgents.length} online
                    </Alert>
                )}

                {/* Message Content */}
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Message Content"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message here..."
                    helperText={`${messageContent.length}/500 characters`}
                    inputProps={{ maxLength: 500 }}
                />

                {/* Error Message */}
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Quick Templates */}
                <Box mt={2}>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                        Quick Templates:
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                        {[
                            'Please update your status',
                            'Team meeting in 15 minutes',
                            'Great work today!',
                            'Please check your queue'
                        ].map((template, index) => (
                            <Button
                                key={index}
                                size="small"
                                variant="outlined"
                                onClick={() => setMessageContent(template)}
                            >
                                {template}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSend}
                    variant="contained"
                    startIcon={<Send />}
                    disabled={!messageContent.trim() || (messageType === 'direct' && !selectedAgent)}
                >
                    Send Message
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MessagePanel;
/**
 * ==============================================
 * MESSAGE PANEL COMPONENT (Fixed Version)
 * ==============================================
 * Modal สำหรับส่งข้อความ
 * - เลือกประเภท: Direct (คนเดียว) หรือ Broadcast (ทั้งทีม)
 * - เลือก agent (ถ้าเป็น direct)
 * - กรอกข้อความ
 * - ส่งข้อความ
 * 
 * FIX: เพิ่ม supervisor prop เพื่อใช้ teamId สำหรับ broadcast
 */

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, RadioGroup, FormControlLabel, Radio,
  FormControl, FormLabel, Select, MenuItem, InputLabel,
  Box, Typography, Alert
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { validateMessage } from '../utils/validation';

function MessagePanel({ open, onClose, supervisor, teamData, onSendMessage }) {
  // State
  const [messageType, setMessageType] = useState('direct'); // 'direct' หรือ 'broadcast'
  const [selectedAgent, setSelectedAgent] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [error, setError] = useState('');

  // ===========================================
  // Handlers
  // ===========================================
  
  /**
   * Handle message type change
   */
  const handleTypeChange = (e) => {
    setMessageType(e.target.value);
    setSelectedAgent(''); // reset agent selection
    setError('');
  };

  /**
   * Handle send message
   */
  const handleSend = () => {
    setError('');

    // Validate message content
    const validationError = validateMessage(messageContent);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Validate agent selection (for direct message)
    if (messageType === 'direct' && !selectedAgent) {
      setError('Please select an agent');
      return;
    }

    // สร้าง message object
    const messageData = {
      content: messageContent.trim(),
      type: messageType,
      priority: 'normal'
    };

    // เพิ่ม recipient ตามประเภท
    if (messageType === 'direct') {
      // Direct message - ใช้ agentCode
      messageData.toCode = selectedAgent;
    } else {
      // Broadcast message - ใช้ teamId จาก supervisor
      // FIX: ใช้ supervisor.teamId แทนการดึงจาก teamData[0]
      if (supervisor && supervisor.teamId) {
        messageData.toTeamId = supervisor.teamId;
      } else {
        // Fallback: ถ้าไม่มี supervisor.teamId ให้ลองดึงจาก agent คนแรก
        const agent = teamData[0];
        if (agent && agent.team_id) {
          messageData.toTeamId = agent.team_id;
        } else {
          setError('Cannot determine team ID for broadcast message');
          return;
        }
      }
    }

    // เรียก callback
    onSendMessage(messageData);

    // Reset form และปิด dialog
    setMessageContent('');
    setSelectedAgent('');
    setMessageType('direct');
    onClose();
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    setMessageContent('');
    setSelectedAgent('');
    setError('');
    onClose();
  };

  // ===========================================
  // Filter online agents
  // ===========================================
  const onlineAgents = teamData.filter(agent => agent.isOnline);

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
        <FormControl component="fieldset" sx={{ mb: 3 }}>
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

        {/* Agent Selection (ถ้าเป็น direct message) */}
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
            {supervisor && supervisor.teamName && (
              <> ({supervisor.teamName})</>
            )}
            <br />
            {teamData.length} agents total, {onlineAgents.length} online
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
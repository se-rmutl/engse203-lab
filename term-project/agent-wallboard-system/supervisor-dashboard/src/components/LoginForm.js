import React, { useState, useEffect } from 'react';
import {
    Paper, TextField, Button, Typography, Alert, Box,
    CircularProgress, Chip
} from '@mui/material';
import { AccountCircle, CheckCircle, Cancel } from '@mui/icons-material';
import { loginSupervisor } from '../services/api';
import { validateSupervisorCode } from '../utils/validation';
import { checkServerHealth } from '../services/api';

function LoginForm({ onLogin }) {
    // State
    const [supervisorCode, setSupervisorCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [serverStatus, setServerStatus] = useState('checking'); // checking, online, offline

    // ตรวจสอบ backend status เมื่อ component mount
    useEffect(() => {
        checkBackendStatus();
    }, []);

    /**
     * ตรวจสอบว่า backend server ทำงานอยู่หรือไม่
     */
    const checkBackendStatus = async () => {
        try {
            await checkServerHealth();
            setServerStatus('online');
        } catch (err) {
            setServerStatus('offline');
            setError('Cannot connect to server. Please make sure backend is running.');
        }
    };

    /**
     * Handle form submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate input
        const validationError = validateSupervisorCode(supervisorCode);
        if (validationError) {
            setError(validationError);
            return;
        }

        // เรียก API
        setLoading(true);
        try {
            const response = await loginSupervisor(supervisorCode.toUpperCase());

            // ตรวจสอบว่าเป็น supervisor จริง
            if (response.data.user.role !== 'supervisor') {
                setError('This code is not a supervisor account');
                setLoading(false);
                return;
            }

            // Login สำเร็จ → เรียก callback
            onLogin(response);

        } catch (err) {
            setError(err.message || 'Login failed. Please check your code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        >
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
                {/* Header */}
                <Box textAlign="center" mb={3}>
                    <AccountCircle sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h4" gutterBottom>
                        Supervisor Dashboard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sign in to monitor your team
                    </Typography>

                    {/* Server Status Badge */}
                    <Box mt={2}>
                        <Chip
                            size="small"
                            icon={serverStatus === 'online' ? <CheckCircle /> : <Cancel />}
                            label={
                                serverStatus === 'checking' ? 'Checking server...' :
                                    serverStatus === 'online' ? 'Server Online' :
                                        'Server Offline'
                            }
                            color={serverStatus === 'online' ? 'success' : 'error'}
                            variant={serverStatus === 'checking' ? 'outlined' : 'filled'}
                        />
                    </Box>
                </Box>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Supervisor Code"
                        placeholder="SP001"
                        value={supervisorCode}
                        onChange={(e) => setSupervisorCode(e.target.value.toUpperCase())}
                        margin="normal"
                        required
                        disabled={loading || serverStatus === 'offline'}
                        autoFocus
                        helperText="Format: SP + 3 digits (e.g., SP001)"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading || serverStatus === 'offline'}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                    </Button>

                    {/* Error Message */}
                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}
                </form>

                {/* Test Credentials */}
                <Box mt={3} textAlign="center">
                    <Typography variant="caption" color="text.secondary">
                        Test Credentials
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                        SP001 • SP002 • SP003
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default LoginForm;
// Integration Test สำหรับ Agent Desktop Phase 2
const { Application } = require('spectron');
const path = require('path');

class IntegrationTester {
    constructor() {
        this.app = null;
        this.testResults = {
            total: 0,
            passed: 0,
            failed: 0,
            errors: []
        };
    }

    async initialize() {
        console.log('🧪 Starting Integration Tests...');
        
        this.app = new Application({
            path: require('electron'),
            args: [path.join(__dirname, '../src/main/main.js'), '--test-mode'],
            env: { NODE_ENV: 'test' }
        });

        await this.app.start();
        console.log('✅ Electron app started');
    }

    async runAllTests() {
        try {
            await this.initialize();
            
            // Test suites
            await this.testAppLaunch();
            await this.testLoginWindow();
            await this.testApiConnection();
            await this.testStatusManagement();
            await this.testMessageSystem();
            await this.testWebSocketConnection();
            
            this.printResults();
            
        } catch (error) {
            console.error('❌ Test suite failed:', error);
            this.testResults.errors.push(error.message);
        } finally {
            if (this.app && this.app.isRunning()) {
                await this.app.stop();
            }
        }
    }

    async testAppLaunch() {
        console.log('\n📱 Testing App Launch...');
        
        await this.runTest('App should start', async () => {
            const isVisible = await this.app.browserWindow.isVisible();
            return isVisible;
        });

        await this.runTest('Login window should be focused', async () => {
            const title = await this.app.browserWindow.getTitle();
            return title.includes('Login');
        });
    }

    async testLoginWindow() {
        console.log('\n🔐 Testing Login Window...');
        
        await this.runTest('Login form should exist', async () => {
            const loginForm = await this.app.client.$('#loginForm');
            return await loginForm.isExisting();
        });

        await this.runTest('Agent code input validation', async () => {
            const agentCodeInput = await this.app.client.$('#agentCode');
            await agentCodeInput.setValue('A001');
            const value = await agentCodeInput.getValue();
            return value === 'A001';
        });

        await this.runTest('Connection status indicator exists', async () => {
            const indicator = await this.app.client.$('#connectionIndicator');
            return await indicator.isExisting();
        });
    }

    async testApiConnection() {
        console.log('\n🌐 Testing API Connection...');
        
        await this.runTest('API client should be available', async () => {
            const result = await this.app.client.execute(() => {
                return typeof window.ApiClient !== 'undefined';
            });
            return result.value;
        });

        await this.runTest('Health check endpoint', async () => {
            const result = await this.app.client.executeAsync((done) => {
                const api = new window.ApiClient();
                api.checkHealth()
                    .then(response => done(response.success))
                    .catch(() => done(false));
            });
            return result.value;
        });
    }

    async testStatusManagement() {
        console.log('\n📊 Testing Status Management...');
        
        // Simulate login first
        await this.simulateLogin();

        await this.runTest('Status buttons should exist', async () => {
            const statusBtns = await this.app.client.$$('.status-btn');
            return statusBtns.length >= 4;
        });

        await this.runTest('Current status display', async () => {
            const statusDisplay = await this.app.client.$('#currentStatus');
            return await statusDisplay.isExisting();
        });
    }

    async testMessageSystem() {
        console.log('\n💬 Testing Message System...');
        
        await this.runTest('Message manager should initialize', async () => {
            const result = await this.app.client.execute(() => {
                return typeof window.messageManager !== 'undefined';
            });
            return result.value;
        });

        await this.runTest('Compose button should exist', async () => {
            const composeBtn = await this.app.client.$('#composeBtn');
            return await composeBtn.isExisting();
        });
    }

    async testWebSocketConnection() {
        console.log('\n🔌 Testing WebSocket Connection...');
        
        await this.runTest('WebSocket manager should initialize', async () => {
            const result = await this.app.client.execute(() => {
                return typeof window.WebSocketManager !== 'undefined';
            });
            return result.value;
        });

        await this.runTest('Connection status tracking', async () => {
            const wsStatus = await this.app.client.$('#wsStatus');
            return await wsStatus.isExisting();
        });
    }

    async simulateLogin() {
        // Fill login form
        await this.app.client.$('#agentCode').setValue('A001');
        await this.app.client.$('#password').setValue('password123');
        await this.app.client.$('#serverUrl').setValue('http://localhost:3001');
        
        // Submit form (but don't actually login to avoid requiring running server)
        // await this.app.client.$('#loginForm').submitForm();
    }

    async runTest(testName, testFn) {
        this.testResults.total++;
        
        try {
            const result = await testFn();
            if (result) {
                console.log(`✅ ${testName}`);
                this.testResults.passed++;
            } else {
                console.log(`❌ ${testName}`);
                this.testResults.failed++;
                this.testResults.errors.push(`${testName}: Test assertion failed`);
            }
        } catch (error) {
            console.log(`❌ ${testName}: ${error.message}`);
            this.testResults.failed++;
            this.testResults.errors.push(`${testName}: ${error.message}`);
        }
    }

    printResults() {
        console.log('\n📊 Test Results Summary:');
        console.log(`Total Tests: ${this.testResults.total}`);
        console.log(`Passed: ${this.testResults.passed}`);
        console.log(`Failed: ${this.testResults.failed}`);
        console.log(`Success Rate: ${((this.testResults.passed / this.testResults.total) * 100).toFixed(1)}%`);
        
        if (this.testResults.errors.length > 0) {
            console.log('\n❌ Failed Tests:');
            this.testResults.errors.forEach(error => {
                console.log(`  • ${error}`);
            });
        }
        
        if (this.testResults.failed === 0) {
            console.log('\n🎉 All tests passed!');
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new IntegrationTester();
    tester.runAllTests()
        .then(() => {
            console.log('\n✅ Test suite completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Test suite failed:', error);
            process.exit(1);
        });
}

module.exports = IntegrationTester;
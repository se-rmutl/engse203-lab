// API Connection Test Script
const ApiClient = require('../src/renderer/js/api-client');

async function testApiConnection() {
    console.log('🧪 Testing API Connection...');
    
    const api = new ApiClient();
    
    try {
        // Test 1: Health Check
        console.log('\n1. Testing Health Check...');
        const health = await api.checkHealth();
        console.log('✅ Health Check:', health);
        
        // Test 2: Get All Agents
        console.log('\n2. Testing Get All Agents...');
        const agents = await api.getAllAgents();
        console.log('✅ Agents:', agents.count, 'agents found');
        
        // Test 3: Get Status Summary
        console.log('\n3. Testing Status Summary...');
        const summary = await api.getStatusSummary();
        console.log('✅ Status Summary:', summary.data);
        
        console.log('\n🎉 All API tests passed!');
        
    } catch (error) {
        console.error('❌ API Test Failed:', error.message);
        console.log('\n📋 Troubleshooting:');
        console.log('1. Make sure Phase 2 API server is running on port 3001');
        console.log('2. Check MongoDB connection');
        console.log('3. Verify API endpoints are working');
    }
}

if (require.main === module) {
    testApiConnection();
}

module.exports = testApiConnection;
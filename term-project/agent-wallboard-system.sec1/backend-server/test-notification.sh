#!/bin/bash

echo "🧪 Testing Notification System"
echo "================================"
echo ""

# Get token
echo "1. Login as AG001..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"agentCode": "AG001"}')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.data.token')
echo "   Token: ${TOKEN:0:20}..."
echo ""

# Wait for agent to connect
echo "2. Waiting for agent to connect (5 seconds)..."
sleep 5
echo ""

# Send message
echo "3. Sending test message..."
curl -s -X POST http://localhost:3001/api/messages/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "fromCode": "SP001",
    "toCode": "AG001",
    "content": "🔔 TEST NOTIFICATION - If you see this, notifications work!",
    "type": "direct",
    "priority": "high"
  }' | jq '.'

echo ""
echo "4. Check Agent App console for logs"
echo "   Look for: [NEW MESSAGE EVENT RECEIVED]"
echo ""
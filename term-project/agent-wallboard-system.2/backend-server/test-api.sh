#!/bin/bash

BASE_URL="http://localhost:3001"

echo "🧪 Testing Backend API..."
echo ""

# Test 1: Health Check
echo "1. Health Check"
curl -s $BASE_URL/health | jq '.'
echo ""

# Test 2: Agent Login
echo "2. Agent Login"
RESPONSE=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"agentCode": "AG001"}')
echo $RESPONSE | jq '.'

TOKEN=$(echo $RESPONSE | jq -r '.data.token')
echo "Token: $TOKEN"
echo ""

# Test 3: Update Status
echo "3. Update Status"
curl -s -X PUT $BASE_URL/api/agents/AG001/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"status": "Busy"}' | jq '.'
echo ""

# Test 4: Get Status History
echo "4. Get Status History"
curl -s -X GET $BASE_URL/api/agents/AG001/history \
  -H "Authorization: Bearer $TOKEN" | jq '.'
echo ""

# Test 5: Supervisor Login
echo "5. Supervisor Login"
SUPER_RESPONSE=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"supervisorCode": "SP001"}')
echo $SUPER_RESPONSE | jq '.'

SUPER_TOKEN=$(echo $SUPER_RESPONSE | jq -r '.data.token')
echo ""

# Test 6: Get Team Members
echo "6. Get Team Members"
curl -s -X GET $BASE_URL/api/agents/team/1 \
  -H "Authorization: Bearer $SUPER_TOKEN" | jq '.'
echo ""

# Test 7: Send Message
echo "7. Send Message"
curl -s -X POST $BASE_URL/api/messages/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $SUPER_TOKEN" \
  -d '{
    "fromCode": "SP001",
    "toCode": "AG001",
    "content": "Test message",
    "type": "direct",
    "priority": "normal"
  }' | jq '.'
echo ""

echo "✅ API Testing completed!"
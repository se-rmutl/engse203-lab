#!/bin/bash

echo "🧪 Complete Agent Desktop App Testing"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Test 1: Check Node.js
echo -n "1. Checking Node.js version... "
NODE_VERSION=$(node --version)
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ $NODE_VERSION${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Node.js not found${NC}"
  ((FAILED++))
fi

# Test 2: Check package.json
echo -n "2. Checking package.json... "
if [ -f "package.json" ]; then
  echo -e "${GREEN}✓ Found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Not found${NC}"
  ((FAILED++))
fi

# Test 3: Check dependencies
echo -n "3. Checking node_modules... "
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓ Installed${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ Not installed - run 'npm install'${NC}"
  ((FAILED++))
fi

# Test 4: Check .env file
echo -n "4. Checking .env file... "
if [ -f ".env" ]; then
  echo -e "${GREEN}✓ Found${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ Not found - copy from .env.example${NC}"
  ((FAILED++))
fi

# Test 5: Check HTML template
echo -n "5. Checking public/index.html... "
if [ -f "public/index.html" ]; then
  echo -e "${GREEN}✓ Found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Not found${NC}"
  ((FAILED++))
fi

# Test 6: Check icons
echo -n "6. Checking icon files... "
if [ -f "public/assets/icon.png" ] && [ -f "public/assets/tray-icon.png" ]; then
  echo -e "${GREEN}✓ Found${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ Icons missing - create placeholder icons${NC}"
  ((FAILED++))
fi

# Test 7: Check main.js
echo -n "7. Checking main.js... "
if [ -f "main.js" ]; then
  echo -e "${GREEN}✓ Found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Not found${NC}"
  ((FAILED++))
fi

# Test 8: Check preload.js
echo -n "8. Checking preload.js... "
if [ -f "preload.js" ]; then
  echo -e "${GREEN}✓ Found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Not found${NC}"
  ((FAILED++))
fi

# Test 9: Check src files
echo -n "9. Checking src/App.js... "
if [ -f "src/App.js" ]; then
  echo -e "${GREEN}✓ Found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Not found${NC}"
  ((FAILED++))
fi

# Test 10: Check ErrorBoundary
echo -n "10. Checking ErrorBoundary... "
if [ -f "src/components/ErrorBoundary.js" ]; then
  echo -e "${GREEN}✓ Found${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ Not found${NC}"
  ((FAILED++))
fi

# Test 11: Check backend connection
echo -n "11. Checking backend server... "
if curl -s http://localhost:3001/health > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Running${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ Not running - start backend first${NC}"
  ((FAILED++))
fi

# Test 12: Check MongoDB
echo -n "12. Checking MongoDB... "
if mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
  echo -e "${GREEN}✓ Running${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ Not running${NC}"
  ((FAILED++))
fi

# Summary
echo ""
echo "======================================"
echo "Test Results:"
echo -e "  ${GREEN}Passed: $PASSED${NC}"
echo -e "  ${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All tests passed! Ready to run.${NC}"
  echo ""
  echo "Next steps:"
  echo "  npm run electron-dev"
else
  echo -e "${YELLOW}⚠ Some tests failed. Please fix issues above.${NC}"
  echo ""
  echo "Common fixes:"
  echo "  - Run 'npm install' if node_modules missing"
  echo "  - Copy .env.example to .env"
  echo "  - Create icon files in public/assets/"
  echo "  - Start backend server"
fi
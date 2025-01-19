#!/bin/bash

echo "🚀 Starting launch sequence..."

# 1. Check dependencies
echo "📦 Checking dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Dependency installation failed"
    exit 1
fi

# 2. Type checking
echo "🔍 Running type checks..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Type checking failed"
    exit 1
fi

# 3. Run tests
echo "🧪 Running tests..."
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed"
    exit 1
fi

# 4. Database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy
if [ $? -ne 0 ]; then
    echo "❌ Database migrations failed"
    exit 1
fi

# 5. Build application
echo "🏗️ Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# 6. Start application
echo "🌟 Starting application..."
npm run start

echo "✅ Launch complete!" 
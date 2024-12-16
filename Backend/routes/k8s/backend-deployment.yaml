FROM node:18

# 비루트 사용자 생성
RUN useradd -m -s /bin/bash nodeuser

WORKDIR /usr/src/app

# 의존성 파일 복사 및 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# uploads 디렉토리 생성 및 권한 설정
RUN mkdir -p uploads && chown -R nodeuser:nodeuser uploads

# 사용자 전환
USER nodeuser

# 포트 설정
EXPOSE 3000

# 앱 실행
CMD ["node", "app.js"]
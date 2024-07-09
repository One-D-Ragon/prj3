# react project build
cd ../frontend
npm run build

# index.html, main.js 복사(이동) : dist -> static
cd ../backend
rm -rf src/main/resources/static
mv ../frontend/dist src/main/resources/static

# spring project build
./gradlew bootJar

# build image
docker build -t 1dragon/prj3 .
#docker buildx build --platform linux/amd64 -t 1dragon/spacehub .

# push image
docker push 1dragon/prj3

# remote 에서

# 컨테이너 멈추고
ssh -i src/main/resources/secret/key0527.pem ubuntu@15.164.226.38 'docker stop spacehub'
# 컨테이너 삭제
ssh -i src/main/resources/secret/key0527.pem ubuntu@15.164.226.38 'docker rm spacehub'
# pull image
ssh -i src/main/resources/secret/key0527.pem ubuntu@15.164.226.38 'docker pull 1dragon/prj3'
# 컨테이너 실행
ssh -i src/main/resources/secret/key0527.pem ubuntu@15.164.226.38 'docker run -d -p 8080:8080 --restart always --name spacehub 1dragon/prj3'
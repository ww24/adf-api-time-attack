curl -X POST http://localhost:3000/api/v1/shortenurl \
  -H 'Content-Type: application/json' \
  -d '{"LongUrl": "http://www.recruit.jp/", "PassWord": "yourpass", "ImageUrl": "https://qiita-image-store.s3.amazonaws.com/0/29945/9e4bd52c-3fc3-a7c2-e8d2-b9911db5b5c8.png"}'

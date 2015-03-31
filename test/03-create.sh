curl -X POST http://localhost:3000/api/v1/shortenurl \
  -H 'Content-Type: application/json' \
  -d '{"LongUrl": "http://www.recruit.jp/", "PassWord": "yourpass"}'

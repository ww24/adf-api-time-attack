# Case 4: 403ページに画像を設定する

## 概要

Case 3で作成したパスワード機能を拡張して、403ページに画像を設定します。

## 要件
1. URL 短縮時にパスワードと画像の URL が指定された場合、画像の URL も格納する。
2. パスワードと画像の URL が指定された短縮 URL にパスワードなしで GET リクエストをした場合、画像を表示する HTML を返す。

## 1. URL 短縮時にパスワードと画像の URL が指定された場合、画像の URL も格納する。
### curl コマンド
```
curl -X POST http://ec2-52-68-44-155.ap-northeast-1.compute.amazonaws.com/api/v1/shortenurl \
  -H 'Content-Type: application/json' \
  -d '{"LongUrl": "http://www.recruit.jp/", "PassWord": "yourpass", "ImageUrl": "https://qiita-image-store.s3.amazonaws.com/0/29945/9e4bd52c-3fc3-a7c2-e8d2-b9911db5b5c8.png"}'
```

### 成功時レスポンス
```
{
 "ShortUrl": "http://example.com/DBMci7xy"
}
```

## 2. パスワードと画像の URL が指定された短縮 URL にパスワードなしで GET リクエストをした場合、画像を表示する HTML を返す。
### curl コマンド
```
curl http://example.com/DBMci7xy
```

### 成功時レスポンス
```
<HTML>
<HEAD>
<TITLE>Forbidden</TITLE>
</HEAD>
<BODY>
<H1>Forbidden</H1>
PassWord required.
<BR>
<IMG SRC="https://qiita-image-store.s3.amazonaws.com/0/29945/9e4bd52c-3fc3-a7c2-e8d2-b9911db5b5c8.png" ALT="">
</BODY>
</HTML>
```

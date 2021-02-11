# クラウドで動作確認したりスタブにしたりする用コンテナイメージ

## ローカルで nodejs 動作確認

初回インストール

```sh
npm install
```

実行

```sh
node index.js
```

アクセス

> http://localhost:8080/

## デプロイ（AWS）

1. aws 上で ECR_Repositories と選択し、URI を確認。以下環境変数に設定

   ```sh
   ecrDomain=「ecr のドメイン」#※「/」は入れない
   ecrPath=「ecr のパス」#※「/」から
   awsProfileName=「任意の文字列」
   dockerImageName=「任意の文字列」
   ```

1. docker をビルド

   ```sh
   docker build -t $dockerImageName .
   imageId=`docker images | grep $dockerImageName |awk '{print $3}'`
   docker tag $imageId $ecrDomain$ecrPath
   ```

1. ECR ログイン用プロファイル作成

   ```sh
   aws configure --profile $awsProfileName #アクセスキーとシークレットキーとリージョンを入力
   ```

1. ECR へログイン

   ```sh
   aws ecr get-login-password --profile $awsProfileName | docker login -u AWS --password-stdin $ecrDomain
   ```

1. ECR へプッシュ
   ```sh
   docker push $ecrDomain$ecrPath
   ```

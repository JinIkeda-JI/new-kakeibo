# 家計簿アプリ (Kakeibo)

## 開発環境構築（VSCode）

このプロジェクトはVSCodeで完結する開発環境を提供します。Eclipseは不要です。

### 必要なもの

- **Java 21** - JDK 21がインストールされている必要があります
- **Node.js** - フロントエンド開発用（推奨: v18以上）
- **Docker Desktop** - PostgreSQL用

### VSCode拡張機能

以下の拡張機能が必要です（既にインストール済みの場合はスキップ）：

- Extension Pack for Java (`vscjava.vscode-java-pack`)
- Spring Boot Extension Pack (`vmware.vscode-boot-dev-pack`)
- Gradle for Java (`vscjava.vscode-gradle`)

## プロジェクト構成

```
kakeibo/
├── docker-compose.yml          # PostgreSQL設定
├── kakeibo-backend/            # Spring Boot バックエンド
│   ├── src/
│   ├── build.gradle
│   └── gradlew.bat
├── kakeibo-frontend/           # React + Vite フロントエンド
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
└── .vscode/
    ├── tasks.json              # タスク定義
    └── launch.json             # デバッグ設定
```

## 起動方法

### 方法1: タスクで個別起動

#### 1. データベース起動
- `Ctrl+Shift+P` → `Tasks: Run Task`
- `Start Database` を選択

#### 2. バックエンド起動
- `Ctrl+Shift+P` → `Tasks: Run Task`
- `Start Backend` を選択（自動的にDBも起動します）

#### 3. フロントエンド起動
- `Ctrl+Shift+P` → `Tasks: Run Task`
- `Start Frontend` を選択

### 方法2: 全サービス一括起動

- `Ctrl+Shift+P` → `Tasks: Run Task`
- `Start All Services` を選択

これで以下が順番に起動します：
1. PostgreSQL (Docker)
2. Spring Boot バックエンド (port 9001)
3. Vite フロントエンド (port 8080)

### 方法3: デバッグモードで起動

- `F5` キーを押す、または
- デバッグビュー (Ctrl+Shift+D) → `Debug Backend (Spring Boot)` を選択
- ブレークポイントを設定してデバッグ可能です

## アクセス

起動後、以下のURLでアクセスできます：

- **フロントエンド**: http://localhost:8080
- **バックエンドAPI**: http://localhost:9001
- **PostgreSQL**: localhost:5432 (DB: kakeibo-app, User: kakeibo_user, Pass: kakeibo)

## 停止方法

### 全サービス停止
- `Ctrl+Shift+P` → `Tasks: Run Task`
- `Stop All Services` を選択

または、各ターミナルで `Ctrl+C` を押す

## データベース管理

### PostgreSQLに接続
```powershell
docker exec -it kakeibo-postgres psql -U kakeibo_user -d kakeibo-app
```

### データベースの状態確認
```powershell
docker-compose ps
```

### データベースのログ確認
```powershell
docker-compose logs postgres
```

## トラブルシューティング

### Docker Desktop が起動していない

**エラー**: `open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.`

**解決策**:
1. Docker Desktop を起動してください
2. タスクバーでDocker アイコンが表示されるまで待つ（数十秒かかる場合があります）
3. 起動確認:
   ```powershell
   docker info
   ```
4. 正常に起動したら、再度タスクを実行してください

### ポートが既に使用されている場合

#### PostgreSQL (5432)
```powershell
# 使用中のプロセスを確認
netstat -ano | findstr :5432
# Dockerコンテナを停止
docker-compose down
```

#### バックエンド (9001)
- [application.properties](kakeibo-backend/src/main/resources/application.properties#L11) で `server.port` を変更

#### フロントエンド (8080)
- [vite.config.ts](kakeibo-frontend/vite.config.ts) で `server.port` を変更

### Gradleビルドエラー

```powershell
cd kakeibo-backend
.\gradlew.bat clean build
```

### フロントエンド依存関係エラー

```powershell
cd kakeibo-frontend
npm install
```

## 開発のヒント

### ホットリロード

- **バックエンド**: Spring Boot DevToolsが有効なので、コード変更時に自動再起動します
- **フロントエンド**: Viteが自動でホットリロードします

### データベーススキーマ

初回起動時にスキーマを作成する必要がある場合は、SQLファイルを作成して実行してください。

### VSCodeターミナル

複数のターミナルを開いて、各サービスのログを個別に確認できます：
- ターミナル1: データベース
- ターミナル2: バックエンド
- ターミナル3: フロントエンド

## 便利なVSCodeショートカット

- `Ctrl+Shift+P`: コマンドパレット
- `F5`: デバッグ開始
- `Ctrl+Shift+D`: デバッグビュー
- `Ctrl+J`: ターミナル表示切替
- `Ctrl+K Ctrl+T`: タスク実行

## さらなる情報

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

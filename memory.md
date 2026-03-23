# Project Memory: schedule-system

## プロジェクト概要
月間・日次のスケジュール管理を行うWebアプリケーション。
対応者ごとの作業チケットをカレンダー形式で可視化し、Supabaseと連携してリアルタイムなデータ管理を行う。

## 技術スタック
- **Frontend**: React 18, Vite 6
- **Styling**: Vanilla CSS (グラスモーフィズム・デザイン)
- **Icons**: Lucide React, SVGカスタムアイコン
- **Database/Auth**: Supabase (PostgreSQL, Auth, RLS)
- **Map**: React Leaflet (Leaflet 1.9), 国土地理院API (ジオコーディング)

## コーディングの癖・UIルール
- **デザインシステム**: 極限まで視認性を高めたプレミアムなグラスモーフィズム。背景ぼかし (`backdrop-filter`) と適切な彩度 (`saturate`) を多用。
- **カラーロジック**:
    - `getRegionColor`: エリア・県別に応じた背景色。
    - `kubunColors`: FTS/委託などの区分に応じたボーダー・テキスト色。
    - `FAULT_LEVEL_COLORS`: 障害レベル (A-E) に応じた警告色。
- **ドキュメント管理**:
    - `仕様書.md`: 機能の詳細、DB構造、権限管理を日本語で日本語で維持。
    - `更新履歴.md`: vX.X.X 形式、または日付形式で詳細な変更点を記録。
    - すべて日本語で記述する。
- **DB設計**:
    - `profiles`: ユーザー基本情報と `sche_role` (admin/worker/viewer)。
    - `worker_settings`: 出発地点、現在地、Google連携用メール。
    - `Equipment`: 号機情報と座標キャッシュ。

## 注意事項
- UIを修正する際は、既存のプレミアムな質感を損なわないように (`glass-card` クラスなどを活用)。
- Supabaseのテーブル名やカラム名の大文字・小文字・スペースに注意 (`Equipment` は大文字開始、`profiles` は小文字など)。
- ジオコーディングは国土地理院APIを使用し、結果を `Equipment` にキャッシュするロジックを維持。

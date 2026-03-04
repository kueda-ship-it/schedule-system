-- ================================================================
-- スケジュール管理システム: sche_role カラム追加
-- Supabase SQL Editor で実行してください
-- ================================================================

-- 1. profiles に sche_role カラムを追加
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS sche_role text;

-- 2. 既存の対応者（eq_role が technician の人）に worker 権限を付与
UPDATE public.profiles SET sche_role = 'worker' WHERE eq_role = 'technician' AND sche_role IS NULL;

-- 3. 管理者（自分）に admin 権限を付与
UPDATE public.profiles SET sche_role = 'admin' WHERE email = 'k_ueda@fts.co.jp';

-- 4. RLS ポリシー: profiles の sche_role を anon でも読み取れるようにする
CREATE POLICY "allow_anon_read_profiles_sche"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. sche_role の更新は authenticated ユーザー（admin）のみ許可
CREATE POLICY "admin_update_sche_role"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND sche_role = 'admin'
    )
  );

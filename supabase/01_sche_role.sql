-- ================================================================
-- スケジュール管理システム: sche_role カラム追加
-- Supabase SQL Editor で実行してください
-- ================================================================

-- 1. profiles に sche_role カラムを追加 (デフォルトは view)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS sche_role text DEFAULT 'view';

-- 2. 既存の 'worker' ロールを 'field_engineer' に移行
UPDATE public.profiles SET sche_role = 'field_engineer' WHERE sche_role = 'worker';

-- 3. sche_role が未設定(null)のユーザーをすべて view に設定
UPDATE public.profiles SET sche_role = 'view' WHERE sche_role IS NULL;

-- 4. 管理者（自分）に admin 権限を付与
UPDATE public.profiles SET sche_role = 'admin' WHERE email = 'k_ueda@fts.co.jp';

-- 5. RLS ポリシー: profiles の sche_role を anon でも読み取れるようにする
DROP POLICY IF EXISTS "allow_anon_read_profiles_sche" ON public.profiles;
CREATE POLICY "allow_anon_read_profiles_sche"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 6. profiles の更新権限（ロール変更など）は admin ロールのみ許可
DROP POLICY IF EXISTS "admin_update_sche_role" ON public.profiles;
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

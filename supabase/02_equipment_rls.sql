-- ================================================================
-- スケジュール管理システム: Equipment (号機) 管理用 RLS
-- Supabase SQL Editor で実行してください
-- ================================================================

-- Equipment テーブルへの INSERT を admin にのみ許可
CREATE POLICY "admin_insert_equipment"
  ON public."Equipment"
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND sche_role = 'admin'
    )
  );

-- Equipment テーブルへの UPDATE を admin にのみ許可 (将来の編集機能向け)
CREATE POLICY "admin_update_equipment"
  ON public."Equipment"
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND sche_role = 'admin'
    )
  );

-- ※ 既に SELECT 用の allow_anon_read_equipment ポリシーは作成済みのため省略

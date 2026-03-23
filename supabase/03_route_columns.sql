-- 1. worker_settings テーブルの新規作成（システム固有の設定を分離）
CREATE TABLE IF NOT EXISTS public.worker_settings (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    departure_address TEXT,
    departure_lat DOUBLE PRECISION,
    departure_lng DOUBLE PRECISION,
    current_lat DOUBLE PRECISION,
    current_lng DOUBLE PRECISION,
    google_email TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Equipment テーブルの拡張（物件座標キャッシュ保持）
ALTER TABLE public."Equipment" 
    ADD COLUMN IF NOT EXISTS lat DOUBLE PRECISION,
    ADD COLUMN IF NOT EXISTS lng DOUBLE PRECISION;

-- 3. RLS ポリシーの設定
ALTER TABLE public.worker_settings ENABLE ROW LEVEL SECURITY;

-- 閲覧: 全員可能
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow all to read worker_settings') THEN
        CREATE POLICY "Allow all to read worker_settings" ON public.worker_settings FOR SELECT USING (true);
    END IF;
END $$;

-- 更新: 本人のみ、または管理者
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow individual or admin to update worker_settings') THEN
        CREATE POLICY "Allow individual or admin to update worker_settings" ON public.worker_settings FOR ALL
        USING (auth.uid() = id OR EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.sche_role = 'admin'
        ));
    END IF;
END $$;

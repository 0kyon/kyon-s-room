// サーバーコンポーネント
import dynamicFn from 'next/dynamic';

// このページはクライアント側のみでレンダリングしたいので SSG をスキップ
export const dynamic = 'force-dynamic';

// SuccessClient をクライアント専用で動的インポート（SSR 無効）
const SuccessClient = dynamicFn(() => import('./SuccessClient'), {
  ssr: false,
});

export default function SuccessPage() {
  return <SuccessClient />;
} 
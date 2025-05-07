'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from './styles.module.css';

type SearchResult = {
  id: string;
  title: string;
  content: string;
  tags: {
    id: string;
    name: string;
  }[];
  publishedAt: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('検索に失敗しました');
        }
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!query) {
    return (
      <div className={styles.container}>
        <h1>検索</h1>
        <p>検索キーワードを入力してください。</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1>検索中...</h1>
        <p>「{query}」の検索結果を取得しています。</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1>エラー</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>検索結果: {query}</h1>
      {results.length === 0 ? (
        <p>検索結果が見つかりませんでした。</p>
      ) : (
        <div className={styles.results}>
          {results.map((result) => (
            <article key={result.id} className={styles.resultItem}>
              <Link href={`/blogs/${result.id}`} className={styles.resultLink}>
                <h2>{result.title}</h2>
                <div className={styles.meta}>
                  <time>{formatDate(result.publishedAt)}</time>
                  {result.tags && result.tags.length > 0 && (
                    <div className={styles.tags}>
                      {result.tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={`/tags/${tag.name}`}
                          className={styles.tag}
                        >
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
} 
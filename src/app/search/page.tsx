'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.css';

type SearchResult = {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  tags: {
    id: string;
    name: string;
  }[];
  publishedAt: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'new';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(query);
  const [isExpanded, setIsExpanded] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        
        // ソート処理
        let sortedData = [...data];
        if (sort === 'new') {
          sortedData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        } else {
          sortedData.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        }
        
        setResults(sortedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, sort]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&sort=${sort}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSortChange = (newSort: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}&sort=${newSort}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 検索文字列をハイライトする関数
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="' + styles.highlight + '">$1</mark>');
  };

  // 検索結果の本文を表示する関数
  const getDisplayContent = (content: string, title: string, searchTerm: string) => {
    // HTMLタグを削除
    const plainContent = content.replace(/<[^>]+>/g, '');
    
    // 検索文字列が本文に含まれるか確認
    const searchTermLower = searchTerm.toLowerCase();
    const contentLower = plainContent.toLowerCase();
    const titleLower = title.toLowerCase();
    
    if (contentLower.includes(searchTermLower)) {
      // 検索文字列の位置を特定
      const index = contentLower.indexOf(searchTermLower);
      // 前後150文字程度を取得（検索語を中心に表示）
      const start = Math.max(0, index - 150);
      const end = Math.min(plainContent.length, index + searchTerm.length + 150);
      let excerpt = plainContent.substring(start, end);
      
      // 文章の先頭や末尾が切れている場合は...を追加
      if (start > 0) excerpt = '...' + excerpt;
      if (end < plainContent.length) excerpt = excerpt + '...';
      
      return highlightText(excerpt, searchTerm);
    } else if (titleLower.includes(searchTermLower)) {
      // タイトルにヒットした場合は冒頭150文字を表示
      const excerpt = plainContent.substring(0, 200) + (plainContent.length > 200 ? '...' : '');
      return excerpt;
    } else {
      // どちらにもヒットしない場合（タグなどでヒット）は冒頭を表示
      const excerpt = plainContent.substring(0, 200) + (plainContent.length > 200 ? '...' : '');
      return excerpt;
    }
  };

  if (!query) {
    return (
      <div className={styles.container}>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchWrapper}>
            <button
              className={styles.searchIcon}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="検索"
            >
              🔍
            </button>
            {isExpanded && (
              <div className={styles.searchInputContainer}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="検索..."
                  className={styles.searchInput}
                />
                <button
                  className={styles.searchButton}
                  onClick={handleSearch}
                  aria-label="検索実行"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
        <p>検索キーワードを入力してください。</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchWrapper}>
            <button
              className={styles.searchIcon}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="検索"
            >
              🔍
            </button>
            {isExpanded && (
              <div className={styles.searchInputContainer}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="検索..."
                  className={styles.searchInput}
                />
                <button
                  className={styles.searchButton}
                  onClick={handleSearch}
                  aria-label="検索実行"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
        <p>「{query}」の検索結果を取得しています。</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.searchBarContainer}>
          <div className={styles.searchWrapper}>
            <button
              className={styles.searchIcon}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="検索"
            >
              🔍
            </button>
            {isExpanded && (
              <div className={styles.searchInputContainer}>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="検索..."
                  className={styles.searchInput}
                />
                <button
                  className={styles.searchButton}
                  onClick={handleSearch}
                  aria-label="検索実行"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchWrapper}>
          <button
            className={styles.searchIcon}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="検索"
          >
            🔍
          </button>
          {isExpanded && (
            <div className={styles.searchInputContainer}>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="検索..."
                className={styles.searchInput}
              />
              <button
                className={styles.searchButton}
                onClick={handleSearch}
                aria-label="検索実行"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className={styles.sortContainer}>
        <button 
          className={`${styles.sortButton} ${sort === 'new' ? styles.active : ''}`}
          onClick={() => handleSortChange('new')}
        >
          🍃新しい順
        </button>
        <button 
          className={`${styles.sortButton} ${sort === 'old' ? styles.active : ''}`}
          onClick={() => handleSortChange('old')}
        >
          🍂古い順
        </button>
      </div>
      
      {results.length === 0 ? (
        <p>検索結果が見つかりませんでした。</p>
      ) : (
        <div className={styles.results}>
          {results.map((result) => (
            <article key={result.id} className={styles.resultItem}>
              <Link href={`/blogs/${result.id}`} className={styles.resultLink}>
                <div className={styles.resultContent}>
                  {result.eyecatch && (
                    <div className={styles.eyecatch}>
                      <Image
                        src={result.eyecatch.url}
                        alt={result.title}
                        width={200}
                        height={150}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div className={styles.textContent}>
                    <h3 dangerouslySetInnerHTML={{ __html: highlightText(result.title, query) }}></h3>
                    <div 
                      className={styles.contentPreview}
                      dangerouslySetInnerHTML={{ 
                        __html: getDisplayContent(result.content, result.title, query) 
                      }}
                    ></div>
                    <div className={styles.meta}>
                      <time>{formatDate(result.publishedAt)}</time>
                      {result.tags && result.tags.length > 0 && (
                        <div className={styles.tags}>
                          {result.tags.map((tag) => (
                            <span key={tag.id} className={styles.tag}>
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
} 
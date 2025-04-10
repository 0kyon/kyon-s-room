"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { client } from '../libs/microcms';


type Blog = {
  id: string;
  title: string;
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const [blogs, setBlogs] = useState<Blog[]>([]); // ブログ一覧用

  // クライアントサイドへのマウント検知
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 画面サイズ変更を検知
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // microCMS から記事取得
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await client.getList<Blog>({ endpoint: 'blogs' });
      setBlogs(data.contents);
    };
    fetchBlogs();
  }, []);

  const isTablet = windowWidth <= 1024 && windowWidth > 600;
  const isMobile = windowWidth <= 480;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
      <div className="container">
        <Link href="/myroom" className="door-button">
          <div className="label">My Room</div>
          <div className="emoji">🤐</div>
        </Link>

        <Link href="/livingroom" className="door-button center">
          <div className="label">Living Room</div>
          <div className="emoji">🗣️</div>
        </Link>

        <Link href="/kitchen" className="door-button">
          <div className="label">Kitchen</div>
          <div className="emoji">🍲</div>
        </Link>
      </div>
      <div className="welcome">Welcome!</div>

      {/* ブログ記事一覧を表示する部分を追加 */}
      <div style={{ padding: '20px', background: '#f5f5f5' }}>
        <h2>ブログ一覧</h2>
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

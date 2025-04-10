'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

export default function DiaryListPage() {
  return (
    <div className={styles.container}>
      <h1>日記一覧</h1>
      <div className={styles.diaryListContainer}>
        {/* ここに日記のリストを表示する予定 */}
      </div>
      <div className={styles.buttonContainer}>
        <Link href="/myroom">
          <button className={styles.backButton}>戻る</button>
        </Link>
      </div>
    </div>
  );
} 
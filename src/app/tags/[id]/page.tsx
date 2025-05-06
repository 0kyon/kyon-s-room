import { client } from "../../../libs/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from "./styles.module.css";

type Tag = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  category: any;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

type Params = {
  params: {
    id: string;
  };
};

// キャッシュの再検証設定
export const revalidate = 10; // 10秒ごとに再検証

// タグIDとタイトル・サブタイトルのマッピング
const tagMapping: { [key: string]: { title: string; subtitle: string } } = {
  "at-my-home": { title: "at My Home", subtitle: "おうちで作ったごはんとおやつ" },
  "away": { title: "Away", subtitle: "お外で食べたおいしいもの" },
  "journeys": { title: "Journeys", subtitle: "旅" },
  "strolls": { title: "Strolls", subtitle: "おさんぽ" },
  "city-notes": { title: "City Notes", subtitle: "街歩き" },
  "readings": { title: "Readings", subtitle: "読んだ本とか" },
  "zine": { title: "Zine", subtitle: "自作～～" },
  "exhibits": { title: "Exhibits", subtitle: "展示" },
  "music": { title: "Music", subtitle: "ライブとか" },
  "films": { title: "Films", subtitle: "映画" },
  // Kitchen関連のタグ
  "recipe-box": { title: "Recipe Box", subtitle: "レシピコレクション" },
  "cupboard": { title: "Cupboard", subtitle: "食器棚のアイテム" },
  // My Room関連のタグ
  "diary": { title: "Diary", subtitle: "日記" },
  "murmur": { title: "Murmur", subtitle: "つぶやき" }
};

export default async function TagPage({ params }: Params) {
  const tagId = params.id;
  
  try {
    // タグIDで検索
    const blogData = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        filters: `tags[contains]${tagId}`,
      },
    });

    if (blogData.contents.length === 0) {
      return (
        <div className={styles.container}>
          <h1 className={styles.tagTitle}>{tagMapping[tagId]?.title || tagId}</h1>
          <p className={styles.tagSubtitle}>{tagMapping[tagId]?.subtitle || ""}</p>
          <p>このタグに関連する記事はありません。</p>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <h1 className={styles.tagTitle}>{tagMapping[tagId]?.title || tagId}</h1>
        <p className={styles.tagSubtitle}>{tagMapping[tagId]?.subtitle || ""}</p>
        
        <ul className={styles.blogList}>
          {blogData.contents.map((blog) => (
            <li key={blog.id} className={styles.blogItem}>
              <Link href={`/blogs/${blog.id}`} className={styles.blogLink}>
                <div className={styles.blogItemContent}>
                  <h2 className={styles.blogTitle}>{blog.title}</h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching tag data:", error);
    return (
      <div className={styles.container}>
        <h1 className={styles.tagTitle}>エラーが発生しました</h1>
        <p>タグ「{tagId}」の記事を取得できませんでした。</p>
        <p>エラー詳細: {error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }
}

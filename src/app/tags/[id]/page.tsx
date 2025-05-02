import { client } from "../../../libs/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

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

export default async function TagPage({ params }: Params) {
  const tagName = decodeURIComponent(params.id);
  
  console.log(`検索するタグ名: ${tagName}`);
  
  try {
    // タグ名で検索 - 修正されたフィルタリング方法
    const blogData = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        filters: `tags[contains]${tagName}`,
      },
    });

    console.log(`タグ「${tagName}」に関連する記事: ${blogData.contents?.length || 0}件`);

    if (blogData.contents.length === 0) {
      return (
        <div style={{ padding: "2rem" }}>
          <h1>タグ: {tagName}</h1>
          <p>このタグに関連する記事はありません。</p>
          <Link href="/">ホームに戻る</Link>
        </div>
      );
    }

    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <Link href="/">ホームに戻る</Link>
        </div>
        
        <h1>タグ: {tagName}</h1>
        
        <ul style={{ listStyle: "none", padding: 0 }}>
          {blogData.contents.map((blog) => (
            <li key={blog.id} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #eee", borderRadius: "5px" }}>
              <Link href={`/blogs/${blog.id}`} style={{ textDecoration: "none", color: "#333" }}>
                <h2 style={{ margin: "0 0 0.5rem 0" }}>{blog.title}</h2>
                <div style={{ fontSize: "0.8rem", color: "#666" }}>
                  公開日: {new Date(blog.publishedAt).toLocaleDateString("ja-JP")}
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
      <div style={{ padding: "2rem" }}>
        <h1>エラーが発生しました</h1>
        <p>タグ「{tagName}」の記事を取得できませんでした。</p>
        <p>エラー詳細: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <div style={{ marginTop: "1rem" }}>
          <Link href="/">ホームに戻る</Link>
        </div>
      </div>
    );
  }
}

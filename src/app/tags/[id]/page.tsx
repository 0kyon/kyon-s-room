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
    // タグ名で検索
    const blogData = await client.getList<Blog>({
      endpoint: "blogs",
      queries: {
        filters: `tags[contains]${encodeURIComponent(tagName)}`,
      },
    });

    console.log({blogData});

    console.log(`tags[contains]${tagName}`);
    
    console.log(`タグ「${tagName}」に関連する記事: ${blogData.contents?.length || 0}件`);

    return (
      <div style={{ padding: "2rem" }}>
        <h1>タグ: {tagName}</h1>
        <ul>
          {blogData.contents.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
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
      </div>
    );
  }
}

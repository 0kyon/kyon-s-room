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

export default async function BlogDetailPage({ params }: Params) {
  const blogId = params.id;
  
  try {
    // IDを使って特定のブログ記事を取得
    const blog = await client.get<Blog>({
      endpoint: "blogs",
      contentId: blogId,
    });

    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <Link href="/">ホームに戻る</Link>
        </div>
        
        <h1>{blog.title}</h1>
        
        {blog.eyecatch && (
          <img 
            src={blog.eyecatch.url} 
            alt={blog.title} 
            style={{ maxWidth: "100%", height: "auto" }}
          />
        )}
        
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          {blog.tags && blog.tags.length > 0 && (
            <div>
              <span>タグ: </span>
              {blog.tags.map((tag, index) => (
                <span key={tag.id}>
                  <Link href={`/tags/${encodeURIComponent(tag.name)}`}>{tag.name}</Link>
                  {index < blog.tags.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div 
          dangerouslySetInnerHTML={{ __html: blog.content }} 
          style={{ marginTop: "2rem" }}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
} 
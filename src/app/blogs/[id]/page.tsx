import { client } from "../../../libs/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

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

// メタデータの設定
export const metadata: Metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

// キャッシュの再検証設定
export const revalidate = 10; // 10秒ごとに再検証

export default async function BlogDetailPage({ params }: Params) {
  const blogId = params.id;
  
  try {
    // IDを使って特定のブログ記事を取得
    const blog = await client.get<Blog>({
      endpoint: "blogs",
      contentId: blogId,
    });

    // 日付をフォーマットする関数
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    };

    return (
      <>
        <div className="blog-container">
          <div className="blog-header">
            {blog.eyecatch && (
              <div className="blog-eyecatch">
                <img 
                  src={blog.eyecatch.url} 
                  alt={blog.title} 
                  className="eyecatch-image"
                />
              </div>
            )}
            
            <div className="blog-title">
              <h1>{blog.title}</h1>
            </div>
          </div>
          
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </div>
        
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "100%", margin: "-2rem auto 10rem auto", position: "relative"}}>
          <div className="blog-date" style={{textAlign: "center", marginBottom: "-2rem"}}>
            Date : {formatDate(blog.publishedAt)}
          </div>
          
          <div className="blog-tags" style={{textAlign: "center"}}>
            {blog.tags && blog.tags.length > 0 && (
              <>
                <span>タグ: </span>
                {blog.tags.map((tag, index) => (
                  <span key={tag.id}>
                    <Link href={`/tags/${encodeURIComponent(tag.name)}`}>{tag.name}</Link>
                    {index < blog.tags.length - 1 && ", "}
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
} 
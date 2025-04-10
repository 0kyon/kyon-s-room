"use client";

import { client } from "../../../libs/microcms";
import { notFound } from "next/navigation";
import Link from "next/link";

type Tag = {
  id: string;
  name: string;
};

type Blog = {
  id: string;
  title: string;
  tags: Tag[];
};

type Params = {
  params: {
    id: string;
  };
};

export default async function TagPage({ params }: Params) {
  const tagId = params.id;

//   const blogData = await client.getList<Blog>({
//     endpoint: "blog", // ←ご自身のブログAPIのエンドポイント名に変更してください
//     queries: {
//       filters: `tags[contains]${tagId}`,
//     },
//   });

//   if (!blogData.contents.length) {
//     notFound();
//   }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>タグ: {tagId}</h1>
      <ul>
        {/* {blogData.contents.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

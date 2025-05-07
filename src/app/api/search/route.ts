import { NextResponse } from 'next/server';
import { client } from '../../../libs/microcms';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: '検索クエリが必要です' }, { status: 400 });
  }

  try {
    // タイトル、本文、タグで検索
    const results = await client.getList({
      endpoint: 'blogs',
      queries: {
        q: query,
        fields: ['id', 'title', 'content', 'eyecatch', 'tags', 'publishedAt'],
      },
    });

    return NextResponse.json(results.contents);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: '検索中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 
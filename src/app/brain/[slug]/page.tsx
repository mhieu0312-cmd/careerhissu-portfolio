import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

// Hàm này đi tìm đúng file .mdx dựa vào cái slug trên thanh địa chỉ
function getPostContent(slug: string) {
  const filePath = path.join(process.cwd(), 'content/garden', `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  return { data, content }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { data, content } = getPostContent(slug)

  return (
    <article className="space-y-6 py-4">
      {/* Phần đầu: Tiêu đề và ngày tháng */}
      <div className="space-y-2 border-b border-gray-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {data.title}
        </h1>
        <p className="text-sm text-gray-500">{data.date}</p>
      </div>

      {/* Phần thân: Nội dung bài viết dịch từ MDX sang HTML */}
      <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-4">
        <MDXRemote source={content} />
      </div>
    </article>
  )
}
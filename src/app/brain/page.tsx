import { getAllPosts } from '../../lib/mdx'
import BrainDashboard from '../../components/BrainDashboard'

// Đánh dấu Next.js render động để load file MDX mới nhất
export const revalidate = 0

export default function BrainPage() {
  // Lấy toàn bộ bài viết từ mọi danh mục (garden, craft, now, journey)
  const posts = getAllPosts()

  return <BrainDashboard initialPosts={posts} />
}
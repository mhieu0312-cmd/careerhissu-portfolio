import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Phép thuật 1: Hàm đi gom bài viết từ thư mục content/garden
function getGardenNotes() {
  const folderPath = path.join(process.cwd(), 'content/garden')
  const files = fs.readdirSync(folderPath)

  const notes = files.map((fileName) => {
    const filePath = path.join(folderPath, fileName)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent) // Bóc tách Frontmatter bằng gray-matter

    return {
      slug: fileName.replace('.mdx', ''),
      title: data.title,
      date: data.date,
      summary: data.summary,
    }
  })

  return notes
}

export default function BrainPage() {
  // Phép thuật 2: Gọi hàm để lấy danh sách bài viết
  const notes = getGardenNotes()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">🧠 THE BRAIN</h1>
        <p className="text-gray-400 mt-2 text-sm">
          Khu vườn tri thức công khai và tài liệu chuyên môn của t.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white border-b border-gray-800 pb-2">🌱 The Garden (Nhật ký học tập)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Phép thuật 3: Vòng lặp in tất cả các bài viết ra màn hình */}
          {notes.map((note) => (
            <div key={note.slug} className="p-5 rounded-lg border border-gray-800 bg-gray-950/50 hover:border-gray-700 transition-colors flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-blue-400 mb-1">{note.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{note.date}</p>
                <p className="text-sm text-gray-400">{note.summary}</p>
              </div>
              <a href={`/brain/${note.slug}`} className="mt-4 text-xs text-blue-400 hover:text-blue-300 font-medium inline-block">
                  Đọc tiếp →
              </a>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}
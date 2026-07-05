import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_PATH = path.join(process.cwd(), 'content');

export interface PostData {
  slug: string;
  category: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
  [key: string]: any;
}

export interface PostDetail extends PostData {
  content: string;
}

// Lấy danh sách toàn bộ các thư mục con trong content (tương ứng với categories)
export function getCategories(): string[] {
  if (!fs.existsSync(CONTENT_PATH)) return [];
  return fs.readdirSync(CONTENT_PATH).filter((file) => {
    return fs.statSync(path.join(CONTENT_PATH, file)).isDirectory();
  });
}

// Lấy thông tin bài viết cụ thể theo category và slug
export function getPostBySlug(category: string, slug: string): PostDetail | null {
  try {
    const filePath = path.join(CONTENT_PATH, category, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      slug,
      category,
      title: data.title || slug,
      date: data.date || '',
      summary: data.summary || '',
      tags: data.tags || [],
      ...data,
      content,
    };
  } catch (error) {
    console.error(`Error reading MDX file for ${category}/${slug}:`, error);
    return null;
  }
}

// Lấy toàn bộ bài viết của một hoặc tất cả các categories
export function getAllPosts(filterCategory?: string): PostData[] {
  const categories = filterCategory ? [filterCategory] : getCategories();
  const posts: PostData[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(CONTENT_PATH, category);
    if (!fs.existsSync(categoryPath)) return;

    const files = fs.readdirSync(categoryPath);
    files.forEach((file) => {
      if (file.endsWith('.mdx')) {
        const slug = file.replace(/\.mdx$/, '');
        const post = getPostBySlug(category, slug);
        if (post) {
          posts.push({
            slug: post.slug,
            category: post.category,
            title: post.title,
            date: post.date,
            summary: post.summary,
            tags: post.tags,
            ...post,
          });
        }
      }
    });
  });

  // Sắp xếp theo ngày giảm dần
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

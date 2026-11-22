import { getCollection } from 'astro:content';

export interface PostItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  content: string;
  description: string;
  img: string;
  tags: string[];
  category: string;
}

export interface TalkItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  content: string;
  tags: string[];
  location: string;
  weather: string;
  mood: string;
  device: string;
}

// 修改点：增加 collectionName 参数，默认为 'posts'
export async function getProcessedPosts(collectionName: string = 'posts'): Promise<PostItem[]> {
  const rawPosts = await getCollection(collectionName as any);
  
  const processed = rawPosts.map((post: any) => {
    const data = post.data;
    let category = data.category || '';
    if (!category && Array.isArray(data.categories) && data.categories.length > 0) {
      category = data.categories[0];
    }

    let tags = [];
    if (Array.isArray(data.tags)) {
      tags = data.tags;
    } else if (typeof data.tags === 'string') {
      tags = data.tags.split(',').map((t: string) => t.trim());
    }

    let parsedDate = '未知时间';
    const rawDate = data.date || data.published;
    if (rawDate) {
      const d = new Date(rawDate);
      if (!isNaN(d.getTime())) {
        /* YAML 解析无时区日期时按 UTC 处理（如 "2026-10-05 13:20:00" → 13:20Z）。
           用 getUTC* 取值保证显示的是 frontmatter 原始值，
           不会因构建服务器时区再偏移。 */
        const year = d.getUTCFullYear();
        const month = String(d.getUTCMonth() + 1).padStart(2, '0');
        const day = String(d.getUTCDate()).padStart(2, '0');
        const hours = String(d.getUTCHours()).padStart(2, '0');
        const minutes = String(d.getUTCMinutes()).padStart(2, '0');
        const seconds = String(d.getUTCSeconds()).padStart(2, '0');
        parsedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    }

    let customSlug = post.slug || post.id;
    if (data.slug && typeof data.slug === 'string' && data.slug.trim() !== '') {
      customSlug = data.slug.trim();
    }
    
    // Normalize pre-encoded slugs from frontmatter (e.g. from imported Wordpress data)
    if (customSlug.includes('%')) {
      try {
        customSlug = decodeURIComponent(customSlug);
      } catch (e) {
        // Fallback to original if not a valid encoding
      }
    }

    return {
      id: post.id || customSlug,
      slug: customSlug,
      title: data.title || '无标题文章',
      date: parsedDate,
      dateISO: parsedDate.replace(' ', 'T'),
      content: post.body || '',
      description: (() => {
        let desc = data.description || data.summary || '';
        if (!desc && post.body) {
          const lines = post.body.split('\n').filter(l => {
            const t = l.trim();
            return t && !t.startsWith('#') && !t.startsWith('![') && !t.startsWith('<') && !t.startsWith('---');
          });
          desc = lines[0] ? lines[0].replace(/[\[\]]/g, '').slice(0, 200) : '';
        }
        return desc;
      })(),
      img: data.img || data.image || data.cover || '',
      tags,
      category
    };
  });

  // Sort descending by date
  return processed.sort((a, b) => {
    if (a.date === '未知时间') return 1;
    if (b.date === '未知时间') return -1;
    return b.date.localeCompare(a.date);
  });
}

export async function getProcessedTalks(): Promise<TalkItem[]> {
  const rawTalks = await getCollection('talks');

  const processed = rawTalks.map((talk: any) => {
    const data = talk.data;
    let tags = [];
    if (Array.isArray(data.tags)) {
      tags = data.tags;
    } else if (typeof data.tags === 'string') {
      tags = data.tags.split(',').map((t: string) => t.trim());
    }
    
    let parsedDate = '未知时间';
    if (data.date) {
      const d = new Date(data.date);
      if (!isNaN(d.getTime())) {
        const year = d.getUTCFullYear();
        const month = String(d.getUTCMonth() + 1).padStart(2, '0');
        const day = String(d.getUTCDate()).padStart(2, '0');
        const hours = String(d.getUTCHours()).padStart(2, '0');
        const minutes = String(d.getUTCMinutes()).padStart(2, '0');
        const seconds = String(d.getUTCSeconds()).padStart(2, '0');
        parsedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    }

    let customSlug = talk.slug || talk.id;
    if (data.slug && typeof data.slug === 'string' && data.slug.trim() !== '') {
      customSlug = data.slug.trim();
    }

    // Normalize pre-encoded slugs from frontmatter
    if (customSlug.includes('%')) {
      try {
        customSlug = decodeURIComponent(customSlug);
      } catch (e) {
        // Fallback
      }
    }

    return {
      id: talk.id || customSlug,
      slug: customSlug,
      title: data.title || '日常动态',
      date: parsedDate,
      content: talk.body || '',
      tags,
      location: data.location || '',
      weather: data.weather || '',
      mood: data.mood || '',
      device: data.device || ''
    };
  });

  // Sort descending by date
  return processed.sort((a, b) => {
    if (a.date === '未知时间') return 1;
    if (b.date === '未知时间') return -1;
    return b.date.localeCompare(a.date);
  });
}
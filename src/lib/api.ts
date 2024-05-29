export const fetchArticleBySlug = async (slug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/articles?slug=${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await res.json();
  if (!result) {
    throw new Error('Article not found');
  }
  return result.data;
};

export const fetchArticles = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API}/articles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
    },
  });
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

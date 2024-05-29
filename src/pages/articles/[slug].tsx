import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { fetchArticleBySlug } from '@/lib/api';

const Article = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['articles', slug],
    queryFn: () => fetchArticleBySlug(slug as string)
  });
  
  if (isLoading) return <div className="flex min-h-screen flex-col items-center justify-between p-24">Loading...</div>;
  if (isError && error instanceof Error) return <div className="flex min-h-screen flex-col items-center justify-between p-24">An error occurred: {error.message}</div>;
  if (data && typeof data === 'object') {
    const articleData = data as { attributes: { title: string; content: string; } };
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{articleData?.attributes.title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{articleData?.attributes.content}</p>
        </div>
      </div>
    );
  }
};

export default Article;

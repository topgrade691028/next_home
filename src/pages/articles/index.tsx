import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchArticles } from '@/lib/api';

const Articles: React.FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles,
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-8 w-9/12 h-4/5">
        <h1 className="text-3xl font-bold mb-4">Articles</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {isLoading ? (
            <p className="text-grey-700 m-2">Loading...</p>
          ) : error ? (
            <p className="text-grey-700 m-2">An error occurred: {error.message}</p>
          ) : (
              <ul className="max-w-sm p-6 rounded-lg">
                {data.data.map((article: any) => (
                  <li className="p-4 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow" key={article.attributes.slug}>
                    <Link href={`/articles/${article.attributes.slug}`}>
                      {article.attributes.title}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
};

export default Articles;

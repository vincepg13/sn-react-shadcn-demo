interface TailwindCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
}

export default function TailwindCard({ title, description, imageUrl, tags }: TailwindCardProps) {
  return (
    <div className="w-full max-w-md rounded overflow-hidden shadow-lg mx-auto dark:border-gray-700 dark:border-2 dark:bg-gray-800">
      <img className="w-full lg:h-[270px] object-cover" src={imageUrl} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base dark:text-gray-400"> {description} </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags?.map((t) => {
          return (
            <span key={t} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}
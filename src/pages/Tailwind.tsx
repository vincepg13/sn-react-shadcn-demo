import TailwindCard from "../components/tailwind/tailwind-card";

function Tailwind() {
  const cards = [
    {
      title: "A Glorious Cat",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      imageUrl: "https://a.storyblok.com/f/176726/1087x721/eb6a30b21c/facts-about-maine-coon-cats.jpeg/m/1600x0",
      tags: ["#photography", "#mainecoon", "#nature"],
    },
    {
      title: "The Coldest Sunset",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      imageUrl: "https://v1.tailwindcss.com/img/card-top.jpg",
      tags: ["#photography", "#travel", "#winter"],
    },
    {
      title: "A Fluffy Puppy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.",
      imageUrl: "https://i.ytimg.com/vi/XR_pu8bD8wQ/maxresdefault.jpg",
      tags: ["#photography", "#retriever", "#happy"],
    },
  ];

  return (
    <div>
      <a
        href="#"
        className="w-full block p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-4"
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tailwind CSS Components
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          This page demonstrates how easy it is to create components using Tailwind CSS. Everything on this page is built using tailwind classes with the cards below packaged into their own component.
        </p>
      </a>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-[1400px] mx-auto">
        {cards.map((card, index) => (
          <TailwindCard
            key={index}
            title={card.title}
            description={card.description}
            imageUrl={card.imageUrl}
            tags={card.tags}
          ></TailwindCard>
        ))}
      </div>
    </div>
  );
}

export default Tailwind;

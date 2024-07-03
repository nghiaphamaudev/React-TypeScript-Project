import React from 'react';
type CardTestionalProps = {
  img: string;
  title: string;
  summary: string;
  time: string;
  author: string;
  content: string;
  link: string;
};

const CardTestional = (props: CardTestionalProps) => {
  return (
    <div>
      <div className="flex max-lg:flex-col bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] hover:scale-105 transition-all duration-300">
        <img
          src={props.img}
          alt="Blog Post 1"
          className="lg:w-2/5 min-h-[250px] h-full object-cover"
        />
        <div className="p-6 lg:w-3/5">
          <h3 className="text-xl font-bold text-[#333]">{props.title}</h3>
          <span className="text-sm block text-gray-400 mt-2">
            {props.time} | BY {props.author}
          </span>
          <p className="text-sm mt-4">{props.content}</p>

          <a
            href={props.link}
            className="mt-4  text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardTestional;

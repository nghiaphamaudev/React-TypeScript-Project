type CardCommentProps = {
  img: string;
  rating: number;
  commentator: string;
  content: string;
};

const CardComment = (props: CardCommentProps) => {
  const arrayStar = [1, 2, 3, 4, 5];
  return (
    <div>
      <div className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src={props.img}
            className="size-14 rounded-full object-cover"
          />

          <div>
            <div className="flex justify-center gap-0.5 ">
              {arrayStar.map((currentValue) => {
                if (currentValue <= props.rating) {
                  return (
                    <span className="text-green-500" key={currentValue}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  );
                }
                return (
                  <span className="text-zinc-400" key={currentValue}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                );
              })}
            </div>

            <p className="mt-0.5 text-lg font-medium text-gray-900">
              {props.commentator}
            </p>
          </div>
        </div>

        <p className="mt-4 text-gray-700">{props.content}</p>
      </div>
    </div>
  );
};

export default CardComment;

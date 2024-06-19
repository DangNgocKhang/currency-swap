import { ReactElement } from "react";
import Image from "next/image";

const Loading = (): ReactElement => {
  return (
    <div className="h-full w-full   flex items-center justify-center">
      <Image
        src={`/loadingToken.png`}
        alt={"loading"}
        width={360}
        height={360}
        className="w-1/2 md:w-1/4 lg:w-52 animate-bounce animate-infinite animate-duration-700"
      />
    </div>
  );
};

export default Loading;

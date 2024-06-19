import Image from "next/image";
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import ListToken from "./ListToken";
import { BsQuestionCircle } from "react-icons/bs";
import swapToken from "./utils/Swap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IListToken } from "./types/Token";

const Home = (): ReactElement => {
  const [loadingPrice, setLoadingPrice] = useState<boolean>(false);
  const [sendValue, setSendValue] = useState<number>(0);
  const [receiveValue, setReceiveValue] = useState<number>(0);

  const [isOpenSelectSendToken, setIsOpenSelectSendToken] =
    useState<boolean>(false);
  const [isOpenSelectReceiveToken, setIsOpenSelectReceiveToken] =
    useState<boolean>(false);
  const [sendToken, setSendToken] = useState<IListToken>({
    token_id: "token5",
    currency: "USD",
  });
  const [receiveToken, setReceiveToken] = useState<IListToken>({
    token_id: "token5",
    currency: "USD",
  });

  const dropdownSendTokenRef = useRef<HTMLDivElement>(null);
  const dropdownReceiveTokenRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownSendTokenRef.current &&
      !dropdownSendTokenRef.current.contains(event.target as Node)
    ) {
      setIsOpenSelectSendToken(false);
    }
    if (
      dropdownReceiveTokenRef.current &&
      !dropdownReceiveTokenRef.current.contains(event.target as Node)
    ) {
      setIsOpenSelectReceiveToken(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSwap();
    }
  };

  const handleInputAmountToSend = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "") // Replace any non-numeric or non-dot characters
      .replace(/(\..*?)\..*/g, "$1") // Remove extra dots
      .replace(/^0[^.]/, "0"); // Ensure that it doesn't start with a non-zero digit
    if (e.target.value === "") {
      setSendValue(0);
      setReceiveValue(0);
    } else {
      setSendValue(parseFloat(e.target.value));
      setReceiveValue(0);
    }
  };

  const handleSwap = () => {
    if (sendValue === 0) {
      toast.info("Enter the amount to deposit to swap assets");
      return;
    }
    setLoadingPrice(true);
    setTimeout(() => {
      const amountReceive = swapToken(sendValue, sendToken.token_id, receiveToken.token_id);
      if (amountReceive === -1) {
        toast.error("Something went wrong");
      } else {
        setReceiveValue(amountReceive);
        setLoadingPrice(false);
        toast.success("Swap complete!");
      }
    }, 1500);
  };

  return (
    <div className="flex-1 w-full  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-2xl">
      <div className="h-28 w-full flex gap-4 px-6 justify-between">
        <div className="flex-1 flex flex-col items-center ">
          <label className="shrink-0 font-Rowdies text-3xl font-normal text-fancy-bg-blue-dark flex justify-center items-center">
            AMOUNT TO SEND
            <BsQuestionCircle
              className="ml-2 text-2xl"
              title="Enter the amount to deposit to swap assets"
            />
          </label>
          <div className="relative flex flex-1 drop-shadow-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {/* <span className="text-fancy-bg-blue-dark">$</span> */}
            </div>
            <input
              type="text"
              onChange={handleInputAmountToSend}
              className="block w-full rounded-xl border-0 outline-0 pl-8 pr-60 text-2xl text-fancy-bg-blue-dark ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fancy-bg-blue-dark "
              placeholder="0.00"
              onKeyDown={handleKeyDown}

            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pl-2 h-full w-max min-w-48 max-w-56 hover:cursor-pointer border-0 border-transparent rounded-xl hover:ring-2  hover:ring-inset hover:ring-fancy-bg-blue-dark"
              onClick={() => setIsOpenSelectSendToken(!isOpenSelectSendToken)}
              ref={dropdownSendTokenRef}
            >
              <div className="h-full  flex justify-between items-center">
                <span className="flex-1">{sendToken.currency}</span>
                <Image
                  src={`../tokens/${sendToken.currency}.svg`}
                  alt="SVG"
                  width={200}
                  height={200}
                  className="h-full aspect-square p-4"
                />
              </div>
              <IoIosArrowDown
                className={`w-8 shrink-0 transition-transform duration-500 ${
                  isOpenSelectSendToken ? "rotate-180 pl-1 " : "rotate-0 pr-1 "
                }`}
              />
              {isOpenSelectSendToken && (
                <ListToken setToken={setSendToken} types={"SEND"} />
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center ">
          <label className="shrink-0 font-Rowdies text-3xl font-normal text-fancy-yellow-dark">
            AMOUNT TO RECEIVE
          </label>
          <div className="relative flex flex-1 drop-shadow-lg">
            <input
              type="text"
              value={receiveValue}
              className="block w-full rounded-xl border-0 outline-0 pl-8 pr-60  text-2xl text-fancy-yellow-dark ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 hover:cursor-pointer focus:ring-inset focus:ring-fancy-yellow-dark "
              readOnly
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pl-2 h-full w-max min-w-48 max-w-56 hover:cursor-pointer border-0 border-transparent rounded-xl hover:ring-2  hover:ring-inset hover:ring-fancy-yellow-dark"
              onClick={() =>
                setIsOpenSelectReceiveToken(!isOpenSelectReceiveToken)
              }
              ref={dropdownReceiveTokenRef}
            >
              <div className="h-full  flex justify-between items-center">
                <span className="flex-1">{receiveToken.currency}</span>
                <Image
                  src={`../tokens/${receiveToken.currency}.svg`}
                  alt="SVG"
                  width={200}
                  height={200}
                  className="h-full aspect-square p-4"
                />
              </div>
              <IoIosArrowDown
                className={`w-8 shrink-0 transition-transform duration-500 ${
                  isOpenSelectReceiveToken
                    ? "rotate-180 pl-1 "
                    : "rotate-0 pr-1 "
                }`}
              />
              {isOpenSelectReceiveToken && (
                <ListToken setToken={setReceiveToken} types={"RECEIVE"} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative -z-10 h-20 w-full  flex justify-center items-center mt-8">
        <button
          className={`${
            loadingPrice ? "hidden" : "block"
          } h-max w-max bg-fancy-green px-5 py-4  rounded-xl text-gray-900  hover:bg-fancy-green-dark font-Rowdies font-normal drop-shadow-lg`}
          onClick={handleSwap}
        >
          CONFIRM SWAP
        </button>

        <div
          className={`${
            loadingPrice ? "flex" : "hidden"
          } w-max  justify-center items-center rounded-xl`}
        >
          <span className="text-gray-900 font-Rowdies font-normal text-3xl">
            SWAPPING...
          </span>
          <Image
            src={`/loading.png`}
            alt={"loading"}
            width={60}
            height={60}
            className="animate-spin animate-infinite animate-duration-[2000ms] ml-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, ReactElement, useEffect } from "react";
import Image from "next/image";
import { listToken } from "./data/listToken";
import { IListToken } from "./types/Token";

interface ListTokenProps {
  setToken: React.Dispatch<React.SetStateAction<IListToken>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  types: String;
}

const ListTokenMbl = ({
  setToken,
  setIsOpen,
  types,
}: ListTokenProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTokens, setFilteredTokens] = useState<IListToken[]>(listToken);
  const [isSelect, setIsSelect] = useState<string>("");
  useEffect(() => {
    const results = listToken.filter((token) =>
      token.currency.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(results);
  }, [searchTerm]);

  return (
    <div
      className="absolute top-0 h-full w-full bg-black bg-opacity-80 z-10 animate-fade animate-duration-500" 
      onClick={() => setIsOpen(false)}
    >
      <div
        className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  w-[80dvw] rounded-xl h-[60dvh] bg-white drop-shadow-lg flex flex-col list-none gap-2 py-4 shadow-md "
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
          event.stopPropagation();
        }}
      >
        <div
          className={`h-14 w-full  sticky top-0 text-center font-bold font-Rowdies text-3xl ${
            types === "SEND"
              ? "text-fancy-bg-blue-dark"
              : "text-fancy-yellow-dark"
          }`}
        >
          {types === "SEND" ? "SEND TOKEN" : "RECEIVE TOKEN"}
        </div>
        <div
          className="h-14 w-full sticky top-0"
          onClick={(event) => {
            event.nativeEvent.stopImmediatePropagation();
            event.stopPropagation();
          }}
        >
          <input
            type="text"
            className={`h-14 w-full px-4 outline-1	shadow-md ${
              types === "SEND"
                ? "outline-fancy-bg-blue"
                : "outline-fancy-yellow-dark"
            }`}
            placeholder="Search token"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-auto no-scrollbar ">
          {filteredTokens.map((token) => {
            let srcIcon = `../tokens/${token.currency}.svg`;
            return (
              <li
                key={token.token_id}
                className={`h-14 w-full flex justify-between items-center px-4 rounded-sm ${
                    token.token_id === isSelect
                    ? types === "SEND"
                      ? "bg-fancy-bg-blue-hover"
                      : "bg-fancy-yellow-hover"
                    : ""
                }`}
                onClick={() => {
                  setToken(token);
                  setIsSelect(token.token_id);
                }}
              >
                <span>{token.currency}</span>
                <Image
                  src={srcIcon}
                  alt="My SVG"
                  width={56}
                  height={56}
                  className="h-14 w-14 p-1"
                />
              </li>
            );
          })}
        </div>
        <div
          className={`h-14 mx-4  text-center py-2 text-3xl  rounded-xl ${
            types === "SEND" ? "bg-fancy-bg-blue-dark" : "bg-fancy-yellow-dark"
          }`}
          onClick={() => setIsOpen(false)}
        >
          Select
        </div>
      </div>
    </div>
  );
};

export default ListTokenMbl;

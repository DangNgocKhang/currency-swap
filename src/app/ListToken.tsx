import React, { useState, ReactElement, useEffect } from "react";
import Image from "next/image";
import { listToken } from "./data/listToken";
import { IListToken } from "./types/Token";

interface ListTokenProps {
  setToken: React.Dispatch<React.SetStateAction<IListToken>>;
  types: String;
}

const ListToken = ({ setToken, types }: ListTokenProps): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredTokens, setFilteredTokens] = useState<IListToken[]>(listToken);

  useEffect(() => {
    // Filter prices based on the search term
    const results = listToken.filter((token) =>
      token.currency.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTokens(results);
  }, [searchTerm]);

  return (
    <div className="absolute top-0 mt-20 h-72 w-max min-w-56 max-w-64 bg-white drop-shadow-lg flex flex-col list-none gap-2 py-2 animate-fade-down animate-duration-500">
      <div
        className="h-14 w-full  sticky top-0"
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
          event.stopPropagation();
        }}
      >
        <input
          type="text"
          className={`h-14 w-full px-4 outline-1	 ${
            types === "SEND"
              ? "outline-fancy-bg-blue"
              : "outline-fancy-yellow-dark"
          }`}
          placeholder="Search token"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-auto">
        {filteredTokens.map((token) => {
          let srcIcon = `../tokens/${token.currency}.svg`;
          return (
            <li
              key={token.token_id}
              // className="h-14 w-full flex justify-between items-center  px-2 rounded-sm cursor-pointer hover:bg-fancy-bg-blue-hover"
              className={`h-14 w-full flex justify-between items-center  px-2 rounded-sm cursor-pointer ${
                types === "SEND"
                  ? "hover:bg-fancy-bg-blue-hover"
                  : "hover:bg-fancy-yellow-hover"
              }`}
              onClick={() => setToken(token)}
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
    </div>
  );
};

export default ListToken;

"use client";
import Link from 'next/link';
import { useState } from "react";
import { checkResponse } from "@/lib/fetcher";
import { ResponseMatchType } from "@/lib/rules";
import Image from "next/image";

export default function Home() {
  const [searchUrl, setSearchUrl] = useState("");
  const [result, setResult] = useState<ResponseMatchType | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  const handleGetUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUrl(e.target.value );
  };

  const handleClick = async () => {
    setLoading(true)
    const response = await checkResponse(searchUrl);
    setResult(response);
    setLoading(false)
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 text-lg row-start-2 items-start sm:items-start w-full">
        <div className="flex flex-col w-full gap-4">
          <p className="">Insert the Url to be checked:</p>
          <div className="flex flex-row gap-4">
            <input
              className=" border-2 border-white w-full p-2"
              onChange={(e) => handleGetUrl(e)}
              value={searchUrl}
              placeholder="https://insert-the-url-to-be-tested"
            />
            <button
              onClick={() => {
                handleClick()
              }}
              className="border font-bold rounded-md px-4 py-2 bg-green-800 cursor-pointer hover:bg-green-700 active:bg-green-800 transition duration-150 ease-in-out"
            >
              Check
            </button>
          </div>
          <div>
            <p className="text-xl">{loading?"Analisando...":""}</p>
            <span>Result: </span>
            {result != ResponseMatchType.Unknown ? (
              <span className="text-green-500 font-bold">{result}</span>
            ) : (
              <span className="text-red-500 font-bold">Not a known platform</span>
            )}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}

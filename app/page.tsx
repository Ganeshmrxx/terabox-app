"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import useSWR from "swr";
import CryptoJS from "crypto-js";
import Image from "next/image";


const fetchWithToken = async (url: URL | RequestInfo) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorRes = await res.json();
    const error = new Error();
    error.message = errorRes?.error;
    throw error;
  }

  return await res.json();
};

function getFormattedSize(sizeBytes: number) {
  let size, unit;

  if (sizeBytes >= 1024 * 1024) {
    size = sizeBytes / (1024 * 1024);
    unit = "MB";
  } else if (sizeBytes >= 1024) {
    size = sizeBytes / 1024;
    unit = "KB";
  } else {
    size = sizeBytes;
    unit = "bytes";
  }

  return `${size.toFixed(2)} ${unit}`;
}

function convertEpochToDateTime(epochTimestamp: number) {
  const normalDate = new Date(epochTimestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = normalDate.toLocaleDateString(undefined, options);
  return formattedDate;
}

function isValidUrl(url: string | URL) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function checkUrlPatterns(url: string) {
  const patterns = [
    /ww\.mirrobox\.com/,
    /www\.nephobox\.com/,
    /freeterabox\.com/,
    /www\.freeterabox\.com/,
    /1024tera\.com/,
    /4funbox\.co/,
    /www\.4funbox\.com/,
    /mirrobox\.com/,
    /nephobox\.com/,
    /terabox\.app/,
    /terabox\.com/,
    /www\.terabox\.ap/,
    /terabox\.fun/,
    /www\.terabox\.com/,
    /www\.1024tera\.co/,
    /www\.momerybox\.com/,
    /teraboxapp\.com/,
    /momerybox\.com/,
    /tibibox\.com/,
    /www\.tibibox\.com/,
    /www\.teraboxapp\.com/,
  ];

  if (!isValidUrl(url)) {
    return false;
  }

  for (const pattern of patterns) {
    if (pattern.test(url)) {
      return true;
    }
  }

  return false;
}

export default function Home() {
 
  const [link, setLink] = useState("");
  const [err, setError] = useState("");
  const [token, setToken] = useState("");
  
  const [submitCalled, setSubmitCalled] = useState(false);

  const { data, error, isLoading } = useSWR(
    token ? [`/api?data=${encodeURIComponent(token)}`] : null,
    ([url]) => fetchWithToken(url),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  
  useEffect(() => {
  const currentURL = window.location.href;
  console.log('Current URL:', currentURL);
  const modifiedURL = currentURL.replace("https://terabox-apps-pi.vercel.app/?", "");
  console.log(modifiedURL);
  
  if (err || error) {
    setTimeout(() => {
      setError("");
    }, 5000);
  }
}, [err, error, data]);

  useEffect(() => {
    if (!submitCalled) {
      
      Submit();
      setSubmitCalled(true);
    }
  }, [submitCalled]);

 

  async function Submit() {
    setError("");
    
    const currentURL = window.location.href;
  console.log('Current URL:', currentURL);
  const link = currentURL.replace("https://terabox-apps-pi.vercel.app/?", "");
  console.log(link);
    const secretKey = "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d";
    const expirationTime = Date.now() + 20000;
    const dataToEncrypt = JSON.stringify({
      token: link,
      expiresAt: expirationTime,
    });
    const encryptedData = CryptoJS.AES.encrypt(
      dataToEncrypt,
      secretKey
    ).toString();
    setToken(encryptedData);
  }

  if (data && data?.dlink) {
    console.log(data?.dlink);
    console.log(data?.thumbs?.url1);
    
  }

  return (
    <div className="pt-6 mx-12">
      <nav className="flex justify-between ">
        <div className="self-center">
          <Link href="/"></Link>
        </div>
        <ul>
          <li>
            {/* <Camera color="red" size={48} /> */}
            <Button className="bg-blue-600">
              <Link href="https://t.me/+x2OU_Cy7F64yZjZl">Telegram</Link>
            </Button>
          </li>
        </ul>
      </nav>
      <main className="mt-6 py-10 bg-slate-700 rounded-lg items-center flex flex-col justify-center gap-2">
        
        <div className="flex flex-col justify-center ">
         
        </div>
        <div id="inputenter" className="self-center" >
          <Button
            className="bg-green-600"
          >
            {isLoading && (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading....</span>
               
              </div>
            )}
            
              {!isLoading && <p className="text-white">Click Below Button</p>}
          </Button>
        </div>
        {error && (
          <p className="bg-rose-500 text-white w-full text-center">
            {error.message}
          </p>
        )}
        {err && (
          <p className="bg-rose-500 text-white w-full text-center">{err}</p>
        )}
      </main>
      {data && (
        <main className="my-10 py-10 bg-slate-700 rounded-lg items-start flex flex-col justify-start gap-2">
          
          <div className="pl-3 pt-3">
            <div className="pt-10"></div>
          </div>
          <Link
            href={data?.dlink}
            target="_blank"
            rel="noopener noreferrer"
            className="py-0 text-xl font-bold text-white self-center"
          >
            <Button
              variant="default"
              className="py-0 bg-blue-700 mt-3 text-xl font-bold"
            >
              {" "}
              Play or Watch
            </Button>
          </Link>
         
        </main>
      )}
    </div>
  );
}

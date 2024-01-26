import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import { ImageData } from "@/types";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { handleDownloadClick } from "@/utils/download";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";

interface Props {
  img: ImageData;
}

export default function Modal({ img }: Props) {
  const [checkboxValue, setCheckboxValue] = useState<string>("previewURL");
  const handleCheckbox = (checked: CheckedState, value: string) => {
    if (checked) setCheckboxValue(value);
  };
  return (
    <div className="p-8">
      <div className="flex gap-10 flex-col md:flex-row">
        <div className="flex-[9]">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image
              src={img.webformatURL}
              alt={img.tags}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        <div className="flex flex-col gap-6 flex-[3]">
          <div>
            <p className="text-xl text-[#3B4043] text-left">Download</p>
            <div className="grid grid-rows-3 border rounded my-5">
              <div className="flex p-3 border-b">
                <p>Small</p>
                <p className="ml-auto mr-5">
                  {img.previewWidth}x{img.previewHeight}
                </p>
                <Checkbox
                  className="rounded-full border-[#DEE8F4]"
                  checked={checkboxValue === "previewURL"}
                  onCheckedChange={(checked) =>
                    handleCheckbox(checked, "previewURL")
                  }
                />
              </div>
              <div className="flex p-3 border-b">
                <p>Medium</p>
                <p className="ml-auto mr-5">
                  {img.webformatWidth}x{img.webformatHeight}
                </p>
                <Checkbox
                  className="rounded-full border-[#DEE8F4]"
                  checked={checkboxValue === "webformatURL"}
                  onCheckedChange={(checked) =>
                    handleCheckbox(checked, "webformatURL")
                  }
                />
              </div>
              <div className="flex m-3">
                <p>Big</p>
                <p className="ml-auto mr-5">
                  {img.imageWidth}x{img.imageHeight}
                </p>
                <Checkbox
                  className="rounded-full border-[#DEE8F4]"
                  checked={checkboxValue === "largeImageURL"}
                  onCheckedChange={(checked) =>
                    handleCheckbox(checked, "largeImageURL")
                  }
                />
              </div>
            </div>
            <Button
              onClick={() => handleDownloadClick(img, checkboxValue)}
              className="w-full bg-[#4BC34B]"
            >
              Download for free!
            </Button>
          </div>
          <div>
            <p className="text-xl text-[#3B4043] mb-5 text-left">Information</p>
            <div className="grid grid-cols-3 gap-x-2 gap-y-4">
              <div>
                <p className="text-[#717579] font-semibold">User</p>
                <p className="text-[#3B4043] font-semibold overflow-hidden text-ellipsis">
                  {img.user}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[#717579] font-semibold">User ID</p>
                <p className="text-[#3B4043] font-semibold">{img.user_id}</p>
              </div>
              <div className="text-right">
                <p className="text-[#717579] font-semibold">Type</p>
                <p className="text-[#3B4043] font-semibold capitalize">
                  {img.type}
                </p>
              </div>
              <div>
                <p className="text-[#717579] font-semibold">Views</p>
                <p className="text-[#3B4043] font-semibold">{img.views}</p>
              </div>
              <div className="text-center">
                <p className="text-[#717579] font-semibold">Downloads</p>
                <p className="text-[#3B4043] font-semibold">{img.downloads}</p>
              </div>
              <div className="text-right">
                <p className="text-[#717579] font-semibold">Likes</p>
                <p className="text-[#3B4043] font-semibold">{img.likes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-11 flex-wrap">
        <p className="text-[#3B4043] font-bold">Tags:</p>
        {img.tags.split(",").map((tag, idx) => (
          <p className="bg-gray-100 rounded px-2" key={tag + idx}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
}

"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageData } from "@/types";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  img?: ImageData;
  open?: boolean;
  showTrigger?: boolean;
}
export default function ImageCard({ img, showTrigger = true }: Props) {
  const [dialogState, setDialogState] = useState(showTrigger ? false : true);
  const searchParams = useSearchParams();
  const router = useRouter();

  function updateURL({
    imageId,
    reset,
  }: {
    imageId?: number | undefined;
    reset?: boolean;
  }) {
    if (imageId) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("photo", imageId.toString());
      window.history.pushState(null, "", `?${params.toString()}`);
    }
    if (reset) {
      if (!showTrigger) {
        router.replace("/");
      } else {
        router.back();
      }
    }
  }

  const handleDialogState = (open: boolean) => {
    setDialogState(open);
    if (!open) updateURL({ reset: true });
  };

  return (
    <Dialog open={dialogState} onOpenChange={handleDialogState}>
      {showTrigger && (
        <DialogTrigger
          asChild
          onClick={(_e) => updateURL({ imageId: img?.id })}
        >
          <div key={img?.id}>
            <AspectRatio ratio={16 / 9} className="bg-muted rounded">
              {img && (
                <Image
                  src={img?.webformatURL}
                  alt={img?.tags}
                  fill
                  className="rounded object-cover"
                />
              )}
            </AspectRatio>
            <div className="flex gap-4 my-2 flex-wrap">
              {img?.tags.split(",").map((tag, idx) => (
                <p className="bg-gray-100 rounded px-2" key={tag + idx}>
                  {tag}
                </p>
              ))}
            </div>
          </div>
        </DialogTrigger>
      )}
      <DialogContent
        aria-describedby={undefined}
        className="md:max-w-screen-xl max-w-[95%] max-h-[80vh] overflow-y-scroll lg:overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Preview ID: {img?.id}</DialogTitle>
          {img && <Modal img={img} />}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

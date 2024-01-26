import { handleDownload } from "@/lib/supabase";
import { ImageData } from "@/types";

type ImageURL = "previewURL" | "webformatURL" | "largeImageURL";

export const handleDownloadClick = async (
  img: ImageData,
  checkboxValue: string
) => {
  const imageUrl = img[checkboxValue as ImageURL];
  const res = await fetch(imageUrl);

  const dl = document.createElement("a");
  let downloadUrl, filenameFromUrl;

  if (checkboxValue === "previewURL") {
    downloadUrl = img.previewURL;
    dl.target = "_blank";
  } else {
    const blobImage = await res.blob();
    const href = URL.createObjectURL(blobImage);
    const urlParts = img.pageURL.split("/");
    filenameFromUrl = urlParts[urlParts.length - 2] + "-" + checkboxValue;

    downloadUrl = href;
  }

  dl.href = downloadUrl;
  dl.download = filenameFromUrl || "image";
  dl.click();

  await handleDownload(img.id);
};

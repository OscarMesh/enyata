import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUploadImage } from "@/features/upload-image/hooks/use-upload-image";
import { useState } from "react";
import { ImageCapture } from "./web-cam";
import FileAddForm from "./file-add-form";
import { Button } from "@/components/ui/button";
import { Camera, File } from "lucide-react";

export const UploadImageSheet = () => {
  const { isOpen, onClose } = useUploadImage();
  const [isWebCam, setIsWebCam] = useState(false);
  const [isFile, setIsFile] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Upload Image(jpeg, png)</SheetTitle>
          <SheetDescription>
            You can create or add to your transactions summary by either
            uploading or taking a capture of your recent receipt
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setIsWebCam((prev) => !prev);
              setIsFile(false);
            }}
          >
            <Camera className="mr-2" />
            Capture
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsWebCam(false);
              setIsFile((prev) => !prev);
            }}
          >
            <File className="mr-2" />
            Choose from file
          </Button>
        </div>

        {isWebCam && <ImageCapture />}
        {isFile && <FileAddForm />}
      </SheetContent>
    </Sheet>
  );
};

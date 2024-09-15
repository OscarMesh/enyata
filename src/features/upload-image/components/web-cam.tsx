import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 500,
  facingMode: "user",
};

export const ImageCapture = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
    console.log(webcamRef.current);
  }, [webcamRef]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Image capture</CardTitle>
          <CardDescription>Please ensure the receipt is clear.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isCaptureEnable || (
            <Button className="w-full" onClick={() => setCaptureEnable(true)}>
              Sart
            </Button>
          )}

          {isCaptureEnable && (
            <>
              <Button
                className="w-full"
                onClick={() => setCaptureEnable(false)}
              >
                Stop
              </Button>

              <div>
                <Webcam
                  className="w-full rounded-md"
                  audio={false}
                  width={540}
                  height={360}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
              <Button className="w-full" onClick={capture}>
                Capture
              </Button>
            </>
          )}
          {url && (
            <>
              <div>
                <img src={url} alt="Screenshot" />
              </div>

              <>
                <Button
                  className="w-full"
                  onClick={() => {
                    setUrl(null);
                  }}
                >
                  Delete
                </Button>
              </>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

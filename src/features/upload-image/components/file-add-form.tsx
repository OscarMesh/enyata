import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUploadTransactionImages } from "../api/use-upload-transactions-image";
import { useUploadImage } from "../hooks/use-upload-image";

const formSchema = z.object({
  file: z.instanceof(File),
});

const FileAddForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const mutation = useUploadTransactionImages();
  const { onClose } = useUploadImage();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: new File([], ""),
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutation.mutate(data.file, {
      onSuccess: () => {
        form.resetField;
        onClose();
      },
    });
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
    } else {
      setPreview(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>Please ensure the file is clear.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full p-10"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>File</FormLabel>
                      <FormControl>
                        <Input
                          accept=".jpg, .jpeg, .png,"
                          type="file"
                          placeholder="Select file"
                          onChange={(e) => {
                            const file = e.target.files
                              ? e.target.files[0]
                              : null;
                            field.onChange(file);
                            handleFileChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {preview && (
                <div className="mt-4">
                  <img
                    src={preview}
                    alt="Selected File"
                    className="w-full h-auto"
                  />
                </div>
              )}
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={mutation.isPending}
              >
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default FileAddForm;

"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Dropzone from "react-dropzone";
import toast from "react-hot-toast";

function DropZone() {
  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading was failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    try {
      const toastId = toast.loading("Uploading...");
      setLoading(true);

      const timestamp = serverTimestamp();

      const docRef = await addDoc(collection(db, "users", user.id, "files"), {
        userId: user.id,
        filename: selectedFile.name,
        fullName: user.fullName,
        profileImage: user.imageUrl,
        timestamp: timestamp,
        type: selectedFile.type,
        size: selectedFile.size,
      });

      const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

      await uploadBytes(imageRef, selectedFile);

      const downloadUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadUrl: downloadUrl,
      });

      toast.success("Upload successful!",{
        id: toastId
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //max size 20MB
  const maxSize = 20971520;

  return (
    <Dropzone onDrop={onDrop} minSize={0} maxSize={maxSize}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "flex items-center justify-center p-5 border border-dashed rounded-lg h-52 w-full",
                isDragActive
                  ? "bg-dropbox text-white animate-pulse"
                  : "text-slate-400 bg-slate-100/50 dark:bg-slate-800/80"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && "Drop to upload this file!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large.</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default DropZone;

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

function RenameModal() {
  const { user } = useUser();
  const [input, setInput] = useState("");

  const [isRenameModalOpen, setIsRenameModalOpen, filename, fileId] =
    useAppStore((state) => [
      state.isRenameModalOpen,
      state.setIsRenameModalOpen,
      state.filename,
      state.fileId,
    ]);

  const renameFile = async () => {
    try {
      if (!user || !fileId) return;
      const toastId = toast.loading("Renaming...");

      await updateDoc(doc(db, "users", user.id, "files", fileId), {
        filename: input,
      })
        .then(() => {
          toast.success("Renamed Successfully",{
            id: toastId
          });
          console.log("Updated the file");
          setInput("");
        })
        .finally(() => {
          setIsRenameModalOpen(false);
        });
    } catch (error) {
      toast.error("Not Renamed");
      console.log("ERROR: " + error);
      setIsRenameModalOpen(false);
    }
  };

  console.log(input)

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the file</DialogTitle>
        </DialogHeader>
        <Input
          id="link"
          defaultValue={filename}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              renameFile();
            }
          }}
        />
        <div className="flex justify-end space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={() => renameFile()}
          >
            <span className="sr-only">Rename</span>
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;

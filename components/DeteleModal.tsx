"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

function DeleteModal() {
  const { user } = useUser();

  const [fileId, setFileId, setIsDeleteModalOpen, isDeleteModalOpen] =
    useAppStore((state) => [
      state.fileId,
      state.setFileId,
      state.setIsDeleteModalOpen,
      state.isDeleteModalOpen,
    ]);

  async function deleteFile() {
    if (!user || !fileId) return;

    const toastId = toast.loading("Deleting...")

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    try {
      deleteObject(fileRef)
        .then(() => {
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(() => {
            toast.success("File deleted successfully",{
              id: toastId
            })
            console.log(fileId + " FILE IS DELETED!");
          });
        })
        .finally(() => {
          setIsDeleteModalOpen(false);
        });
    } catch (error) {
      toast.error("Can't delete the file", {
        id: toastId
      });
      console.log("ERROR: " + error);
      setIsDeleteModalOpen(false);
    }
  }
  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure want to delete?</DialogTitle>
          <DialogDescription className="pt-3">
            This action cannot be undone. This will permanently delete your
            file!
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            variant={"destructive"}
            className="px-3 flex-1"
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteModal;

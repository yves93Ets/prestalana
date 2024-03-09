import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormStatus } from "react-dom";

import { renameColumn, addColumn } from "@/app/column/column-actions";
import Spinner from "../common/Spinner";

export const RenameColumnAction = ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  const [show, setShow] = useState(false);
  const { pending } = useFormStatus();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelSubmit = (form: FormData) => {
    handleClose();
    renameColumn(form);
  };

  return (
    <>
      <p onClick={handleShow}>Rename</p>
      <Modal show={show} onHide={handleClose}>
        <form action={handelSubmit}>
          <Modal.Dialog className="flex  rounded xl:p-4 p-4 min-w-[450px] sm:w-full min-h-[250px]">
            <Modal.Header closeButton>
              <Modal.Title>Rename column</Modal.Title>
            </Modal.Header>

            <Modal.Body className="flex gap-2 flex-col">
              <p>New Title</p>

              <input
                placeholder={title}
                type="text"
                name="name"
                className="border border-slate-300 rounded px-2 py-1 
            outline-none"
              />
              <input
                type="text"
                name="id"
                readOnly
                value={id}
                className="hidden"
              />
            </Modal.Body>

            <Modal.Footer>
              <Button
                onClick={handleClose}
                className="!border-gray-300 !bg-gray-200 !text-black px-3 py-1 mr-2"
              >
                Close
              </Button>
              <Button
                className="!border-gray-300 !bg-gray-300 !text-black px-3 py-1"
                type="submit"
              >
                {pending ? <Spinner /> : "Save"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </form>
      </Modal>
    </>
  );
};
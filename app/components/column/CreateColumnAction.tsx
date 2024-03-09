import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Columns3 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { addColumn } from "@/app/column/column-actions";
import useColumns from "@/app/components/hooks/useColumns";
import { IconButton } from "@/app/components/common";
import Spinner from "../common/Spinner";

export const CreateColumnAction = ({}) => {
  const { getColumns: columns } = useColumns();
  const [show, setShow] = useState(false);
  const { pending } = useFormStatus();
  const colSize = Object.keys(columns).length;
  const isMaxed = colSize >= 5;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelSubmit = (form: FormData) => {
    handleClose();
    addColumn(form);
  };

  return (
    <div>
      <IconButton
        action={handleShow}
        icon={Columns3}
        tooltipText="Add a Column"
      />
      <Modal show={show} onHide={handleClose}>
        <form action={handelSubmit}>
          <Modal.Dialog className="flex  rounded xl:p-4 p-4 min-w-[450px] sm:w-full min-h-[250px]">
            <Modal.Header closeButton>
              <Modal.Title>Add column</Modal.Title>
            </Modal.Header>

            <Modal.Body className="flex gap-2 flex-col">
              <p>Title</p>

              <input
                disabled={isMaxed}
                type="text"
                name="name"
                className="border border-slate-300 rounded px-2 py-1 
            outline-none"
              />
              {isMaxed && (
                <p className="text-red-500">
                  Number of columns is max out need to delete at least 1
                </p>
              )}
              <input
                type="text"
                name="order"
                readOnly
                value={colSize + 1}
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
    </div>
  );
};
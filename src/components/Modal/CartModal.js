import React from "react";
import Modal from '@material-ui/core/Modal';

export default function CartModal(props) {
  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose}>
        {props.body}
      </Modal>
     
    </div>
  );
}

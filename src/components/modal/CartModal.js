import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "./CartModal.scss";

const CartModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleClickCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="btnR"
        onClick={handleClickOpenModal}
      >
        상담완료
      </Button>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box className="modalBox">
          {/* <img
            className="completeImg"
            id="modal-modal-title"
            src={completeImg}
            alt="complete"
          /> */}
          <Typography id="modal-modal-description" className="modalDescription">
            상담을 완료하시겠습니까?
          </Typography>
          <Box className="buttonBox">
            <Button className="buttonL">
              <span>예</span>
            </Button>
            <Button className="buttonR">
              <span>아니요</span>
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CartModal;

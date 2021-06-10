import React from "react";

// reactstrap components
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { GradientButton, OutlinedButton } from "../Buttons";
import DetailLabel from "./DetailLabel";

function StakeSuccessModal({ modalOpen, setModalOpen }) {
  //   const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <>
      {/* <Button color="primary" type="button" onClick={() => setModalOpen(!modalOpen)}>
        Launch demo modal
      </Button> */}
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title " id="exampleModalLabel">
            Token staked successfully!
          </h5>
          <button aria-label="Close" className=" close" type="button" onClick={() => setModalOpen(!modalOpen)}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <DetailLabel title="Staked" desc="960.0000 SDAO LP" />
          <DetailLabel title="APY (approx.)" desc="34.74 %" />
          <hr />
          <DetailLabel title="You get (approx.)" desc="345.2500 SDAO" />
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <OutlinedButton color="interactive2" type="button" onClick={() => setModalOpen(false)}>
            Stake more
          </OutlinedButton>
          <GradientButton type="button" className="py-2" onClick={() => setModalOpen(false)}>
            ok
          </GradientButton>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default StakeSuccessModal;

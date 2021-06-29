import React from "react";

// reactstrap components
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { GradientButton, OutlinedButton } from "../Buttons";
import { ResultLabel, DetailLabel } from "./Label";

function AddLiquiditySuccessModal({ modalOpen, setModalOpen, title, itemsList, resultsList, primaryAction, secondaryAction }) {
  return (
    <>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title " id="exampleModalLabel">
            {title}
          </h5>
          <button aria-label="Close" className=" close" type="button" onClick={() => setModalOpen(!modalOpen)}>
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          {itemsList.map((item) => (
            <DetailLabel title={item.label} desc={item.desc} key={item.label} />
          ))}
          {/* <DetailLabel title="Staked" desc="960.0000 SDAO LP" />
          <DetailLabel title="APY (approx.)" desc="34.74 %" /> */}
          <hr />
          {resultsList.map((result) => (
            <ResultLabel title={result.label} desc={result.desc} key={result.label} />
          ))}
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          {secondaryAction ? (
            <OutlinedButton color="interactive2" type="button" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </OutlinedButton>
          ) : null}
          <GradientButton type="button" className="py-2" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </GradientButton>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default AddLiquiditySuccessModal;

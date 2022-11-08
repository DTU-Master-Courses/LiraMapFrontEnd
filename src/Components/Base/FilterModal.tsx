import { useState } from "react";
import { Modal } from "react-overlays";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0;
`;

const PositionedModal = styled(Modal)`
  position: fixed;
  width: 150px;
  z-index: 1040;
  top: 70%;
  left: 10%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

interface FilterProps {
  toggleVisibility(): any;
}

const FilterModal = ({ toggleVisibility }: FilterProps) => {
  const [show, setShow] = useState(true);

  const renderBackdrop = (props: any) => <Backdrop {...props} />;

  const internalToggleVisibility = () => {
    setShow(false);
    toggleVisibility();
  };

  return (
    <PositionedModal
      show={show}
      aria-labelledby="modal-label"
      onHide={internalToggleVisibility}
      renderBackdrop={renderBackdrop}
    >
      <div>
        <h4 id="modal-label">Text in a modal</h4>
        <p>Lorem ipsum</p>
      </div>
    </PositionedModal>
  );
};

export default FilterModal;

import React from "react";

export function useDetectOutsideClick(
  onClose: () => void,
  ref: any,
  isOpen: boolean
) {
  React.useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    if (ref.current) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [onClose, ref, isOpen]);
}

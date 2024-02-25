import { useEffect, useRef } from "react"
import modal from '@/assets/file.mp4'
import "./Modal.css"

export const Modal = ({ isOpen, onClose, children }) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    return (
        <>
        {isOpen && <div class="video-container">
            <video autoPlay loop muted>
                <source src={modal} type="video/mp4" />
            </video>
            <video autoPlay loop muted>
                <source src={modal} type="video/mp4" />
            </video>
        </div>
        }
        <dialog ref={dialogRef} onCancel={onClose}>
            <button class="close-button" onClick={onClose}>
                <span>&times;</span>
            </button>
            <div class="modal-content">
                {children}
            </div>
        </dialog>
        </>
    )
}
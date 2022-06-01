import { XIcon } from '@heroicons/react/outline'
import MuiModal from '@mui/material/Modal'
import { useRecoilState } from 'recoil'
import { modalModeState } from '../../atoms/modalAtoms'
import Info from './Info'
import Player from './Player'

const Modal = () => {
  const [modalMode, setModalMode] = useRecoilState(modalModeState)

  const closeHandler = () => {
    setModalMode(false)
  }

  return (
    <MuiModal
      open={modalMode}
      onClose={closeHandler}
      className="fixed !top-7 left-0 right-0 !bottom-7 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          className="modalBtn sticky float-right right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={closeHandler}
        >
          <XIcon className="h-6 w-6" />
        </button>
        <Player />
        <Info />
      </>
    </MuiModal>
  )
}

export default Modal

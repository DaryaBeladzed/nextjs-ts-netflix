import { MenuItem, Menu as MenuMUI, Button } from '@mui/material'
import { useState } from 'react'
import { HEADER_LINKS } from '../constants/header'
// import useAuth from "../hooks/useAuth"

const Menu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  //   const { logout } = useAuth()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ul className="hidden space-x-4 md:flex">
        {HEADER_LINKS.map(
          (link: string, ind: number): JSX.Element => (
            <li key={ind} className="headerLink">
              {link}
            </li>
          )
        )}
      </ul>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="headerLink !normal-case md:!hidden"
      >
        Brouse
      </Button>
      <MenuMUI
        anchorEl={anchorEl}
        id="basic-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 2.5,
            bgcolor: 'rgba(0, 0, 0, .9)',
            borderTop: '2px solid white',
            width: '45%',
            '& .MuiMenuItem-root': {
              fontSize: '.8rem',
              justifyContent: 'center',
              color: 'gray',
              '&:hover': {
                color: 'white',
              },
            },
            // '&:before': {
            //   content: '"\\f0de"',
            //   display: 'block',
            //   position: 'absolute',
            //   top: 0,
            //   right: '50%',
            //   width: 10,
            //   height: 10,
            //   //   borderTop: '4px solid white',
            //   //   borderLeft: '4px solid white',
            // //   bgcolor: 'background.paper',
            //   transform: 'translateX(50%)',
            //   //   transform: 'translateX(50%) translateY(-50%) rotate(45deg)',
            //   zIndex: 0,
            // },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {HEADER_LINKS.map(
          (link: string, ind: number): JSX.Element => (
            <MenuItem key={ind}> {link}</MenuItem>
          )
        )}
      </MenuMUI>
    </>
  )
}

export default Menu

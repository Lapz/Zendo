import { useState } from "react"

import {
  ListItemText as MaterialListItemText,
  ListItem as MaterialListItem,
  Collapse
} from "@material-ui/core"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

interface IListItemProps {
  button?: true | false
  text: string
  icon?: JSX.Element
  sublist?: JSX.Element
  handleClick?: () => void
}

interface IListProps {
  disablePadding?: boolean
}

const List: React.FC<IListProps> = ({ children, disablePadding }) => {
  return <List disablePadding={disablePadding as any}>{children}</List>
}

const ListItem: React.FC<IListItemProps> = ({
  button = false,
  sublist,
  icon,
  text
}) => {
  const [open, setOpen] = useState(true)
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      <MaterialListItem onClick={handleClick} button={button as any}>
        {icon ? icon : null}
        <MaterialListItemText primary={text} />
        {sublist ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </MaterialListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {sublist ? sublist : null}
      </Collapse>
    </>
  )
}

export default List
export { ListItem }

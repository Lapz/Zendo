import {
  Checkbox,
  TextField,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Collapse,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from "@material-ui/core"

import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import { useState } from "react"
interface IFormFieldProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string
  placeholder?: string
  labelClasses?: string
  multiline?: boolean
  value: string
  name: string
  required?: boolean
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void)
}

interface IFormCheckBoxProps extends React.HTMLAttributes<HTMLInputElement> {
  label?: string
  labelPlacement?: "bottom" | "start" | "end" | "top"
  name: string
  value: boolean
  required?: boolean
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void)
}

const FormCheckBox: React.FC<IFormCheckBoxProps> = ({
  required,
  handleChange,
  name,
  value,
  label,
  labelPlacement
}) => {
  const checkbox = (
    <Checkbox
      checked={value}
      onChange={handleChange}
      name={name}
      required={required}
      value={value}
    />
  )
  return (
    <FormGroup>
      {label ? (
        <FormControlLabel
          control={checkbox}
          label={label}
          labelPlacement={labelPlacement}
        />
      ) : (
        checkbox
      )}
    </FormGroup>
  )
}

const FormField: React.FC<IFormFieldProps> = ({
  label,
  labelClasses = "",
  multiline = false,
  placeholder = "",
  value,
  name,
  itemType = "text",
  handleChange,
  required
}) => {
  return (
    <TextField
      name={name}
      type={itemType}
      value={value}
      required={required}
      onChange={handleChange}
      placeholder={placeholder}
      multiline={multiline}
    />
  )
}

interface IFormListItemProps {
  button?: true | false
  text: string
  icon?: JSX.Element
  sublist?: JSX.Element
  handleClick?: () => void
}

interface IFormListProps {
  button?: true | false
  text: string
  icon?: JSX.Element
  sublist?: JSX.Element
}

const FormList: React.FC<{}> = ({ children }) => {
  // const [open, setOpen] = useState(true)

  return <List>{children}</List>
}

const FormListItem: React.FC<IFormListItemProps> = ({
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
      <ListItem onClick={handleClick} button={button as any}>
        {icon ? icon : null}
        <ListItemText primary={text} />
        {sublist ? open ? <ExpandLess /> : <ExpandMore /> : null}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {sublist ? sublist : null}
      </Collapse>
    </>
  )
}

interface IFormSelectProps {
  label: string
  name: string
  required?: boolean
  value: unknown
  helperText?: string
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void)
}

const FormSelect: React.FC<IFormSelectProps> = ({
  label,
  required = false,
  value,
  handleChange,
  children,
  name,
  helperText
}) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select name={name} value={value} onChange={handleChange}>
        {children}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  )
}

export { FormField, FormCheckBox, FormSelect }

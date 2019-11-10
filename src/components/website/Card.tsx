import {
  Card as MaterialCard,
  Box as MaterialBox,
  CardContent as MaterialCardContent
} from "@material-ui/core"

import clsx from "clsx"
import { CardProps } from "material-ui"
import { makeStyles } from "@material-ui/styles"
import theme from "../../theme/theme"
interface ICardProps extends CardProps {
  justify?: "start" | "center" | "end" | "space-between" | "space-round"
  padding?: number
  maxWidth?: number
  maxHeight?: number
  align?: "start" | "center" | "normal" | "end" | "space-between"
}

const useStyles = ({ padding, justify, align, maxHeight, maxWidth }) =>
  makeStyles({
    card: {
      display: "flex",
      justifyContent: justify,
      padding,
      alignContent: align,
      maxHeight,
      maxWidth
    }
  })

const Card: React.FC<ICardProps> = ({
  className = "",
  children,
  justify,
  padding,
  align,
  maxHeight,
  maxWidth
}) => {
  const classes = useStyles({
    justify,
    padding,
    align,
    maxHeight,
    maxWidth
  })({})

  return (
    <MaterialCard raised className={classes.card}>
      <MaterialBox display="flex" justifyContent={justify}>
        <MaterialCardContent>{children}</MaterialCardContent>
      </MaterialBox>
    </MaterialCard>
  )
}

export default Card

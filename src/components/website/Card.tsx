const { matches } = require("z")

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean
  rounded?: boolean
  justify?: "start" | "center" | "end" | "between" | "around"
}

const Card: React.FC<ICardProps> = ({
  className = "",
  shadow = true,
  rounded = true,
  children,
  justify
}) => {
  let justifyClass: string = ""

  switch (justify) {
    case "start":
      justifyClass = "justify-start"
      break
    case "center":
      justifyClass = "justify-center"
      break
    case "end":
      justifyClass = "justify-end"
      break
    case "between":
      justifyClass = "justify-between"
      break
    case "around":
      justifyClass = "justify-around"
      break
    default:
      break
  }

  return (
    <div
      className={`${className} ${rounded ? "rounded" : ""} ${
        shadow ? "shadow-lg" : ""
      } ${justifyClass}`}
    >
      {children}
    </div>
  )
}

export default Card

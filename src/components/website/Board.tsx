import { makeStyles } from "@material-ui/styles"
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DroppableProvided
} from "react-beautiful-dnd"
import { useState } from "react"
import { Card, CardContent, Theme } from "@material-ui/core"
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // overflowX: "hidden",
    // overflowY: "hidden",
    background: "#ebecf0"
  },
  container: {
    display: "inline-flex",
    flexDirection: "column",
    userSelect: "none",
    transition: "background-color 0.2s ease, opacity 0.1s ease"
  },

  card: {
    margin: theme.spacing(2)
  }
}))

interface IBoardProps {
  columns: unknown[]
}

const TodoItem: React.FC<{ todo: string }> = ({ todo }) => {
  const classes = useStyles({})
  return (
    <Card className={classes.card}>
      <CardContent>{todo}</CardContent>
    </Card>
  )
}

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const Board: React.FC<IBoardProps> = ({ columns }) => {
  const classes = useStyles({})

  const [ordered, setOrderd] = useState<string[]>([
    "Wake Up",
    "Take a shot",
    "Have some fun"
  ])

  const onDragEnd = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return
    }

    const source = result.source
    const destination = result.destination
    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    if (result.type === "COLUMN") {
      const reOrdered: string[] = reorder(
        ordered,
        source.index,
        destination.index
      )

      setOrderd(reOrdered)

      return
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.root}>
        <Droppable type="COLUMN" direction="horizontal" droppableId="board">
          {(provided: DroppableProvided) => (
            <div
              className={classes.container}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {ordered.map((key: string, index: number) => (
                <Draggable
                  key={key}
                  draggableId={`${key}-${index}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem todo={key} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default Board

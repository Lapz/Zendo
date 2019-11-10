import { useFormik } from "formik"
import { values } from "mobx"
import { FormField, FormCheckBox, FormSelect } from "../website/Form"
import Card from "../website/Card"
import theme from "../../theme/theme"
import AddIcon from "@material-ui/icons/Add"
import DoneIcon from "@material-ui/icons/Done"
import {
  MenuItem,
  FormControl,
  Button,
  Fab,
  FormGroup
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/dayjs"
import { DatePicker } from "@material-ui/pickers"
interface IAddTodoFormProps {
  priorities: IPriority[]
}

interface IPriority {
  name: string
  value: number
}

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4)
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  }
}))

const AddTodoForm: React.FC<IAddTodoFormProps> = () => {
  const classes = useStyles({})
  const formik = useFormik({
    initialValues: {
      description: "",
      completed: false,
      date: new Date(),
      priority: ""
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
    }
  })

  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card
        className="pa-6 ma-4 flex"
        justify="center"
        padding={theme.spacing(1)}
      >
        <form
          className="mb-4 pb-4 w-full max-w-sm"
          onSubmit={formik.handleSubmit}
        >
          <FormControl>
            <FormField
              value={formik.values.description}
              name="description"
              placeholder="What to do ?"
              required
              handleChange={formik.handleChange}
            ></FormField>

            <FormSelect
              handleChange={formik.handleChange}
              required
              name="priority"
              helperText="How much time needed"
              label="Priority"
              value={formik.values.priority}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </FormSelect>

            <DatePicker
              value={formik.values.date}
              onChange={(date) => {
                formik.setFieldValue("date", date)
              }}
            />

            <FormCheckBox
              className="ma-2"
              label="Completed"
              value={formik.values.completed}
              name="completed"
              handleChange={formik.handleChange}
            />

            <div className={classes.actions}>
              <Fab color="primary">
                <AddIcon />
              </Fab>
              <Fab onClick={() => formik.handleSubmit()}>
                <DoneIcon />
              </Fab>
            </div>
          </FormControl>

          {/* <button>Completed</button> */}
        </form>
      </Card>
    </MuiPickersUtilsProvider>
  )
}

export default AddTodoForm

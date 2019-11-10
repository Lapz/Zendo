import { useFormik } from "formik"
import { values } from "mobx"
import { FormField, FormCheckBox, FormSelect } from "../website/Form"
import Card from "../website/Card"
import theme from "../../theme/theme"

import { MenuItem, FormControl } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useState } from "react"

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
  }
}))

const AddTodoForm: React.FC<IAddTodoFormProps> = () => {
  const classes = useStyles({})
  const formik = useFormik({
    initialValues: {
      description: "",
      completed: false,
      priortiy: ""
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
            name="priortiy"
            helperText="How much time needed"
            label="priortiy"
            value={formik.values.priortiy}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </FormSelect>

          <FormCheckBox
            className="ma-2"
            label="Completed"
            value={formik.values.completed}
            name="completed"
            handleChange={formik.handleChange}
          />
        </FormControl>

        {/* <button>Completed</button> */}
      </form>
    </Card>
  )
}

export default AddTodoForm

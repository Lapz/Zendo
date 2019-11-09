import { useFormik } from "formik"
import { values } from "mobx"
import { FormField } from "../website/Form"
import Card from "../website/Card"

interface IAddTodoFormProps {
  priorities: IPriority[]
}

interface IPriority {
  name: string
  value: number
}

const AddTodoForm: React.FC<IAddTodoFormProps> = () => {
  const formik = useFormik({
    initialValues: {
      description: ""
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2))
    }
  })

  return (
    <Card className="pa-6 ma-4">
      <form onSubmit={formik.handleSubmit}>
        <FormField
          label="What to do ?"
          value={formik.values.description}
          name="description"
          handleChange={formik.handleChange}
        ></FormField>
      </form>
    </Card>
  )
}

export default AddTodoForm

interface IFormFieldProps {
  label?: string
  placeholder?: string
  labelClasses?: string
  value: string
  name: string
  handleChange: (
    eventOrPath: string | React.ChangeEvent<any>
  ) => void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void)
}

const FormField: React.FC<IFormFieldProps> = ({
  label,
  labelClasses = "",
  placeholder = "",
  value,
  name,
  handleChange
}) => {
  return (
    <>
      {label ? (
        <div className="md:w-1/3">
          <label className={`${labelClasses} block font-bold`}>{label}</label>
        </div>
      ) : (
        undefined
      )}
      <div className="md:w-2/3">
        <input
          className="bg-gray-200 apperance-none border-2 border-gray-200 leading-tight"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
        />
      </div>
    </>
  )
}

export { FormField }

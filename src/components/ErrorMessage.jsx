/* eslint-disable react/prop-types */

const ErrorMessage = ({message}) => {
  return (
    <span className="text-sm ml-1 text-red-400">{message}</span>
  )
}

export default ErrorMessage
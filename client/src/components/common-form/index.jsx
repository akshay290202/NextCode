import React from 'react'
import FormControls from './form-controls'
import { Button } from '../ui/button'

const CommonForm = ({ handleSubmit, buttonText,
     formControls = [],
     formData,
     setFormData,
     isButtonDisabled = false,
}) => {
     return (
          <form onSubmit={handleSubmit}>
               {/* render form components here */}
               <FormControls
                    formControls={formControls}
                    formData={formData}
                    setFormData={setFormData} />
               <Button disabled={isButtonDisabled} type="submit" className="mt-5 w-full bg-blue-500 hover:bg-blue-600">{buttonText || 'Submit'}</Button>
          </form>
     )
}

export default CommonForm
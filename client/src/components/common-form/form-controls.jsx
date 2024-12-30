import React from 'react'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const FormControls = ({ formControls = [], formData, setFormData }) => {
     function renderComponentByType(getControlItem) {
          let element = null;
          const currenControlItemValue = formData[getControlItem.name] || '';
          switch (getControlItem.componentType) {
               case 'input':
                    element = <Input
                         id={getControlItem.name}
                         name={getControlItem.name}
                         placeholder={getControlItem.placeholder}
                         type={getControlItem.type}
                         value={currenControlItemValue}
                         onChange={(event) => setFormData({
                              ...formData,
                              [getControlItem.name]: event.target.value
                         })}
                    />;
                    break;
               case 'select':
                    element = <Select
                         onValueChange={(value) => setFormData({
                              ...formData,
                              [getControlItem.name]: value
                         })}
                         value={currenControlItemValue}>
                         <SelectTrigger className='w-full'>
                              <SelectValue placeholder={getControlItem.label} />
                         </SelectTrigger>
                         <SelectContent>
                              {
                                   getControlItem.options && getControlItem.options.length > 0 ?
                                        getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) : null
                              }
                         </SelectContent>
                    </Select>;
                    break;
               case 'textarea':
                    element = <Textarea
                         id={getControlItem.name}
                         name={getControlItem.name}
                         placeholder={getControlItem.placeholder}
                         value={currenControlItemValue}
                         onChange={(event) => setFormData({
                              ...formData,
                              [getControlItem.name]: event.target.value
                         })}
                    />;
                    break;
               default:
                    element = <Input
                         id={getControlItem.name}
                         name={getControlItem.name}
                         placeholder={getControlItem.placeholder}
                         type={getControlItem.type}
                         value={currenControlItemValue}
                         onChange={(event) => setFormData({
                              ...formData,
                              [getControlItem.name]: event.target.value
                         })}
                    />;
                    break;
          }

          return element;
     };

     return (
          <div className="flex flex-col gap-3">
               {
                    formControls.map(controlItems =>
                         <div className="" key={controlItems.name}>
                              <Label htmlFor={controlItems.name}>
                                   {controlItems.label}
                              </Label>
                              {
                                   renderComponentByType(controlItems)
                              }
                         </div>
                    )
               }
          </div>
     )
}

export default FormControls;
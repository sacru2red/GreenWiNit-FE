import Row from '@/components/common/form/row'
import { Path, useController, UseControllerProps } from 'react-hook-form'
import Required from '@/components/common/required'
import { FormState } from './type'
import InputUploadImage from '@/components/common/form/input-upload-image'

type MinFormState = Pick<FormState, 'image'>
type ImageRowProps<T extends MinFormState> = Omit<UseControllerProps<T>, 'name'>
const ImageRow = <T extends MinFormState>(props: ImageRowProps<T>) => {
  const form = useController({
    ...props,
    name: 'image' as Path<T>,
    rules: { ...props.rules, required: true },
  })

  return (
    <Row>
      <h3>
        대표 이미지
        <Required />
      </h3>
      <InputUploadImage {...form.field} value={form.field.value ?? null} />
    </Row>
  )
}

export default ImageRow

import Row from '@/components/common/form/Row'
import { Path, useController, UseControllerProps } from 'react-hook-form'
import Required from '@/components/common/Required'
import { FormState } from './type'
import Textarea from '@/components/common/form/Textarea'

type MinFormState = Pick<FormState, 'review'>
type ReviewRowProps<T extends MinFormState> = Omit<UseControllerProps<T>, 'name'>
const ReviewRow = <T extends MinFormState>(props: ReviewRowProps<T>) => {
  const form = useController({
    ...props,
    name: 'review' as Path<T>,
    rules: { ...props.rules, required: true },
  })

  return (
    <Row>
      <h3>
        간단한 후기를 남겨주세요.
        <Required />
      </h3>
      <Textarea {...form.field} placeholder="최대 글자수 45자 여러분의 이야기를 작성해주세요." />
    </Row>
  )
}

export default ReviewRow

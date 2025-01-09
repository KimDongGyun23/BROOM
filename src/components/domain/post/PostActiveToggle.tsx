import { CheckBoxIcon } from '@/components/view/icons/ActiveIcons'

type ActiveToggleProps = {
  isChecked: boolean
  onToggle: VoidFunction
}

export const PostActiveToggle = ({ isChecked, onToggle }: ActiveToggleProps) => (
  <div className="mx-4 border-b border-b-grey-200 py-2">
    <button type="button" className="flex-align ml-auto gap-1" onClick={onToggle}>
      <CheckBoxIcon active={isChecked} />
      <p className={`p-900 ${isChecked ? 'text-blue-500' : 'text-black-300'}`}>
        모집 중인 글만 보기
      </p>
    </button>
  </div>
)

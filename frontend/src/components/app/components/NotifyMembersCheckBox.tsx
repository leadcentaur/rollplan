import { useState } from 'react';

interface NotifyMembersCheckBoxProps {
  notifyMembers: (flag: boolean) => void;
}

const NotifyMembersCheckBox = ({notifyMembers}: NotifyMembersCheckBoxProps) => {

  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div>
      <label
        htmlFor="checkboxLabelOne"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            onChange={() => {
              setIsChecked(!isChecked);
              notifyMembers(isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              isChecked && 'border-red-500 bg-gray dark:bg-transparent'
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-red-500'}`}
            ></span>
          </div>
        </div>
        Notify members of event changes
      </label>
    </div>
  );
};

export default NotifyMembersCheckBox;

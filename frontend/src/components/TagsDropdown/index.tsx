import React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const tagOptions = [
  { key: 're', value: '67891', text: 'React' },
  { key: 'ja', value: '12345', text: 'Java' }
];

export interface ITagDropdownProps extends DropdownProps {
}

const TagsDropdown: React.FC<ITagDropdownProps> = ({ className, ...props }) => (
  <Dropdown
    className={classNames(styles.dropdown, className)}
    clearable
    fluid
    multiple
    search
    selection
    options={tagOptions}
    placeholder="Enter tags"
    {...props}
  />
);

export default TagsDropdown;

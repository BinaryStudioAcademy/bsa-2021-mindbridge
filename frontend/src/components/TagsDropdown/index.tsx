import React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const tagOptions = [
  { key: 'Science', value: '678916b1a086a-6fc9-426e-9514-ac67d508fb7c', text: 'Science' },
  { key: 'JavaScript', value: 'a099b732-23ba-49aa-9b94-a9541b1c18b7', text: 'JavaScript' },
  { key: 'Java', value: 'b280ecd5-243f-4b55-ba4e-4777ef49453b', text: 'Java' },
  { key: '.NET', value: 'b6c3b74f-b7e6-4718-92fc-e9491ee51d0b', text: '.NET' }
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

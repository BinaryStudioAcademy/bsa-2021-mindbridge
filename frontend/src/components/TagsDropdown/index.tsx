import React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import styles from './styles.module.scss';
import classNames from 'classnames';

export interface ITagDropdownProps extends DropdownProps {
}

const TagsDropdown: React.FC<ITagDropdownProps> = ({ className, data, allTags, ...props }) => (
  <Dropdown
    className={classNames(styles.dropdown, className)}
    clearable
    fluid
    multiple
    search
    selection
    options={allTags}
    value={data}
    placeholder="Enter tags"
    {...props}
  />
);

export default TagsDropdown;

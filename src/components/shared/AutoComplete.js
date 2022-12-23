/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  TextField,
  Autocomplete,
  createFilterOptions,
  Checkbox,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const selectAll = 'Select All';

const MultiSelect = ({
  items,
  label,
  selectAllLabel,
  noOptionsText,
  limitTags,
  onChange,
  selectedOption,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(selectedOption);
  const allSelected = items.length === selectedOptions.length;
  const handleToggleOption = (selectedOptions) =>
    setSelectedOptions(selectedOptions);
  const handleClearOptions = () => setSelectedOptions([]);
  const getOptionLabel = (option) => option;
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedOptions(items);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll && handleSelectAll(!allSelected);
  };

  const handleChange = (event, selectedOptions, reason) => {
    if (reason === 'select-option' || reason === 'remove-option') {
      if (selectedOptions.find((option) => option === selectAll)) {
        handleToggleSelectAll();
        let result = [];
        result = items.filter((el) => el !== selectAll);
        return onChange(result);
      } else {
        handleToggleOption && handleToggleOption(selectedOptions);
        return onChange(selectedOptions);
      }
    } else if (reason === 'clear') {
      handleClearOptions && handleClearOptions();
    }
  };

  const optionRenderer = (option, { selected }) => {
    const selectAllProps =
      option === selectAll // To control the state of selectAll checkbox
        ? { checked: allSelected }
        : {};
    return (
      <li>
        <Checkbox
          color='primary'
          icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
          checkedIcon={<CheckBoxIcon fontSize='small' />}
          style={{ marginRight: 8 }}
          checked={selected}
          {...selectAllProps}
        />
        {getOptionLabel(option)}
      </li>
    );
  };

  const inputRenderer = (params) => (
    <TextField {...params} label={label} size='small' />
  );

  const getOptionSelected = (option, anotherOption) =>
    option === anotherOption;

  const filter = createFilterOptions();

  return (
    <Autocomplete
      multiple
      size='small'
      limitTags={limitTags}
      options={items}
      value={selectedOptions}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      noOptionsText={noOptionsText}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return [selectAll, ...filtered];
      }}
      onChange={handleChange}
      renderOption={optionRenderer}
      renderInput={inputRenderer}
    />
  );
};

export default MultiSelect;

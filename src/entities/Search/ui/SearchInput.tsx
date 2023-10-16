import { Input } from 'shared/ui/Input/Input.tsx';
import SearchIcon from 'shared/assets/icons/search-icon.svg?react';
import React from 'react';

interface SearchInputProps {
	className?: string,
	value?: string,
	onChange?: (value: string) => void,
	onEnterKey?: () => void
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
	readOnly?: boolean,
	autoFocus?: boolean
}

export const SearchInput = (props: SearchInputProps) => {
	const {
		className,
		value,
		onChange,
		onEnterKey,
		onKeyDown,
		readOnly,
		autoFocus
	} = props;

	const onChangeHandler = (value: string) => {
		onChange?.(value);
	};
	const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement> ) => {
		if (event.key === 'Enter'){
			onEnterKey?.();
		}
		onKeyDown?.(event);
	};
	const onIconClick = () => {
		onEnterKey?.();
	};

	return (
		<Input
			value={value}
			onChange={onChangeHandler}
			onKeyDown={onKeyDownHandler}
			onIconClick={onIconClick}
			className={className}
			RightIcon={SearchIcon}
			readOnly={readOnly}
			autoFocus={autoFocus}
		/>
	);
};


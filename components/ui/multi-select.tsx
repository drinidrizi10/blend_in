import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface MultiSelectOption {
	label: string;
	value: string;
}

interface MultiSelectProps {
	options: MultiSelectOption[];
	value: string[];
	onChange: (value: string[]) => void;

	placeholder?: string;
	searchPlaceholder?: string;
	emptyText?: string;
	disabled?: boolean;
	className?: string;
}

export function MultiSelect({
	options,
	value,
	onChange,
	placeholder = 'Select...',
	searchPlaceholder = 'Search...',
	emptyText = 'Nothing found.',
	disabled,
	className,
}: MultiSelectProps) {
	function toggleOption(option: string) {
		if (value.includes(option)) {
			onChange(value.filter((v) => v !== option));
		} else {
			onChange([...value, option]);
		}
	}

	const selectedLabels = options
		.filter((o) => value.includes(o.value))
		.map((o) => o.label);

	const displayValue =
		selectedLabels.length === 0
			? placeholder
			: selectedLabels.length <= 1
				? selectedLabels.join(', ')
				: `${selectedLabels.length} selected`;

	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						type='button'
						variant='ghost'
						disabled={disabled}
						className={`w-full justify-between bg-input/50 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 ${className ?? ''}`}>
						<span className='truncate'>{displayValue}</span>

						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				}></PopoverTrigger>

			<PopoverContent className='w-75 p-0'>
				<Command>
					<CommandInput placeholder={searchPlaceholder} />

					<CommandEmpty>{emptyText}</CommandEmpty>

					<CommandGroup>
						{options.map((option) => {
							const selected = value.includes(option.value);

							return (
								<CommandItem
									key={option.value}
									onSelect={() => toggleOption(option.value)}>
									<Check
										className={`mr-2 h-4 w-4 transition-opacity duration-150 ${
											selected
												? 'opacity-100'
												: 'opacity-0'
										}`}
									/>

									{option.label}
								</CommandItem>
							);
						})}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

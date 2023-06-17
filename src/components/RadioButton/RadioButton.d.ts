export interface RadioButtonProps {
    children?: React.ReactNode | string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
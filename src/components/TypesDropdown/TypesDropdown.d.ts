import { Option } from "react-dropdown";

export interface TypesDropdownProps {
    types: string[];
    selectedType: string;
    onChange: (arg: Option) => void;
}
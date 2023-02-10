import { PropType } from 'vue';
export interface ISliderProps {
    modelValue: number | number[];
    min: number;
    max: number;
    step: number;
    showInput: boolean;
    showInputControls: boolean;
    inputSize: string;
    showStops: boolean;
    showTooltip: boolean;
    formatTooltip: (val: number) => number | string;
    disabled: boolean;
    range: boolean;
    vertical: boolean;
    height: string;
    debounce: number;
    label: string;
    tooltipClass: string;
    marks?: Record<number, any>;
}
export declare const SliderProps: {
    modelValue: {
        type: PropType<number | number[]>;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    showInput: {
        type: BooleanConstructor;
        default: boolean;
    };
    showInputControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    showStops: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    formatTooltip: {
        type: PropType<(val: number) => number | string>;
        default: undefined;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    range: {
        type: BooleanConstructor;
        default: boolean;
    };
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    debounce: {
        type: NumberConstructor;
        default: number;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    tooltipClass: {
        type: StringConstructor;
        default: undefined;
    };
    marks: ObjectConstructor;
};

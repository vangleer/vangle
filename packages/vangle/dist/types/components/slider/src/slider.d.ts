import { PropType } from 'vue';
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
    vertical: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
};

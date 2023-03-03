import { PropType } from 'vue';
export declare const TooltipProps: {
    content: StringConstructor;
    placement: {
        type: StringConstructor;
        default: string;
    };
    effect: {
        type: PropType<"light" | "dark">;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
    };
    rawContent: BooleanConstructor;
    transitionName: {
        type: StringConstructor;
        default: string;
    };
};

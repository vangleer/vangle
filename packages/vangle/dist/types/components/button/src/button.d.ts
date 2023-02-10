import type { PropType } from 'vue';
export declare const ButtonProps: {
    type: PropType<"primary" | "info" | "success" | "warning" | "danger">;
    size: PropType<"mini" | "small" | "large">;
    plain: BooleanConstructor;
    autofocus: BooleanConstructor;
    round: BooleanConstructor;
    circle: BooleanConstructor;
    text: BooleanConstructor;
    icon: StringConstructor;
    color: StringConstructor;
    disabled: BooleanConstructor;
    textColor: {
        type: StringConstructor;
    };
    ripple: {
        type: BooleanConstructor;
        default: boolean;
    };
};

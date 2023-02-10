export declare const DialogProps: {
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeIcon: {
        type: StringConstructor;
        default: string;
    };
    customClass: {
        type: StringConstructor;
        default: string;
    };
    draggable: {
        type: BooleanConstructor;
        default: boolean;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    beforeClose: {
        type: FunctionConstructor;
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickModal: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnPressEscape: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    modal: {
        type: BooleanConstructor;
        default: boolean;
    };
    openDelay: {
        type: NumberConstructor;
        default: number;
    };
    closeDelay: {
        type: NumberConstructor;
        default: number;
    };
    top: {
        type: StringConstructor;
    };
    modelValue: {
        type: BooleanConstructor;
        required: boolean;
    };
    modalClass: StringConstructor;
    width: {
        type: (StringConstructor | NumberConstructor)[];
    };
    zIndex: {
        type: NumberConstructor;
    };
    trapFocus: {
        type: BooleanConstructor;
        default: boolean;
    };
};

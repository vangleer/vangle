import { PropType } from 'vue';
export declare const OverlayProps: {
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    customMaskEvent: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayClass: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
    };
    zIndex: {
        type: PropType<string | number>;
        default: number;
    };
};

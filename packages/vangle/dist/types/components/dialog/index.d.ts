export * from './src/dialog';
export declare const VanDialog: import("@vangle/utils").SFCWithInstall<import("vue").DefineComponent<{}, {
    props: any;
    emit: (event: "update:modelValue" | "open" | "opened" | "close" | "closed", ...args: any[]) => void;
    n: (suffix?: string | undefined) => string;
    targetRef: import("vue").Ref<HTMLElement | undefined>;
    handleRef: import("vue").Ref<HTMLElement | undefined>;
    visible: import("vue").Ref<boolean>;
    draggable: import("vue").ComputedRef<any>;
    doOpen: () => void;
    doClose: () => any;
    onModalClick: () => void;
    onClose: () => void;
    onPressEscape: (e: KeyboardEvent) => void;
    VanOverlay: import("@vangle/utils").SFCWithInstall<import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>> & Record<string, any>;
    VanIcon: import("@vangle/utils").SFCWithInstall<import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>> & Record<string, any>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "open" | "opened" | "close" | "closed")[], "update:modelValue" | "open" | "opened" | "close" | "closed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    onOpened?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onClosed?: ((...args: any[]) => any) | undefined;
}, {}>> & Record<string, any>;
export default VanDialog;

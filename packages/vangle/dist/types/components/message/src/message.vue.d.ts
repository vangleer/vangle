declare const _sfc_main: import("vue").DefineComponent<{}, {
    iconMap: any;
    props: any;
    emit: (event: "close" | "destroy", ...args: any[]) => void;
    n: (suffix?: string | undefined) => string;
    visible: import("vue").Ref<boolean>;
    timerId: import("vue").Ref<any>;
    styles: import("vue").ComputedRef<{
        top: string;
        zIndex: any;
    }>;
    startTimer: () => void;
    clearTimer: () => void;
    close: () => boolean;
    beforeLeave: () => void;
    VanIcon: import("@vangle/utils").SFCWithInstall<import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>> & Record<string, any>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "destroy")[], "close" | "destroy", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onDestroy?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;

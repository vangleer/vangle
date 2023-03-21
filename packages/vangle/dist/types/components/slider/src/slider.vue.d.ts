import { CSSProperties } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{}, {
    props: any;
    emit: (event: "update:modelValue" | "input", ...args: any[]) => void;
    n: (suffix?: string | undefined) => string;
    slider: import("vue").Ref<HTMLElement | null>;
    tooltipRef: import("vue").Ref<any>;
    visible: import("vue").Ref<boolean>;
    timerId: import("vue").Ref<any>;
    sliderStyle: import("vue").ComputedRef<{
        '--van-slider-main-bg-color': any;
    }>;
    currentPosition: import("vue").WritableComputedRef<number>;
    tooltipValue: import("vue").ComputedRef<any>;
    barStyle: import("vue").ComputedRef<CSSProperties>;
    diffValue: import("vue").ComputedRef<number>;
    wrapperStyle: import("vue").ComputedRef<CSSProperties>;
    isFocus: import("vue").Ref<boolean>;
    dragging: import("vue").Ref<boolean>;
    onButtonDown: (e: MouseEvent | TouchEvent) => void;
    getClientXY: (event: MouseEvent | TouchEvent) => {
        clientX: number;
        clientY: number;
    };
    setUpFocus: () => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    setUpKeyEvent: () => void;
    setPosition: (newPosition: number) => void;
    cleanUp: () => void;
    readonly VanTooltip: import("@vangle/utils").SFCWithInstall<import("vue").DefineComponent<unknown, object, {}, import("vue").ComputedOptions, import("vue").MethodOptions, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<unknown>, {}>> & Record<string, any>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "input")[], "update:modelValue" | "input", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;

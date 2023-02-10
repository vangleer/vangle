import { PropType, VNode, ExtractPropTypes, AppContext } from 'vue';
export declare const messageTypes: readonly ["success", "info", "warning", "error"];
export declare const MessageProps: {
    duration: {
        type: NumberConstructor;
        default: number;
    };
    message: {
        type: PropType<string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }> | (() => VNode)>;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    id: {
        type: StringConstructor;
        default: string;
    };
    onClose: {
        type: FunctionConstructor;
        required: boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        values: readonly ["success", "info", "warning", "error"];
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    grouping: {
        type: BooleanConstructor;
        default: boolean;
    };
    repeatNum: {
        type: NumberConstructor;
        default: number;
    };
};
export interface MessageHandle {
    close: () => void;
}
export type MessageFn = ((options?: MessageParams, appContext?: null | AppContext) => MessageHandle) & {
    closeAll(): void;
};
export type MessagePropsTypes = ExtractPropTypes<typeof MessageProps>;
export type MessageParams = Partial<MessagePropsTypes> | string | VNode | any;
export type MessageOptionsTyped = Omit<MessagePropsTypes, 'type'>;
export type MessageParamsTyped = Partial<MessageOptionsTyped> | string | VNode;
export type MessageTypedFn = (options?: MessageParamsTyped, appContext?: null | AppContext) => MessageHandle;
export interface Message extends MessageFn {
    success: MessageTypedFn;
    warning: MessageTypedFn;
    info: MessageTypedFn;
    error: MessageTypedFn;
}

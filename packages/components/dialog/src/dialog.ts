export const DialogProps = {
  center: {
    type: Boolean,
    default: false,
  },
  closeIcon: {
    type: String,
    default: '',
  },
  customClass: {
    type: String,
    default: '',
  },
  draggable: {
    type: Boolean,
    default: false,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: '',
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  beforeClose: {
    type: Function,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  openDelay: {
    type: Number,
    default: 0,
  },
  closeDelay: {
    type: Number,
    default: 0,
  },
  top: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  modalClass: String,
  width: {
    type: [String, Number],
  },
  zIndex: {
    type: Number,
  },
  trapFocus: {
    type: Boolean,
    default: false,
  }
}
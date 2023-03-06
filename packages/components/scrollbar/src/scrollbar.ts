export const ScrollbarProps = {
  height: {
    type: [String, Number]
  },
  native: {
    type: Boolean
  },
  always: {
    type: Boolean
  },
  minSize: {
    type: Number,
    default: 20,
  },
  verticle: {
    type: Boolean,
    default: true
  }
}
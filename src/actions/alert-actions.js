export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export const updateAlert = config => {
  const defaults = {
    type: HIDE_ALERT,
    payload: {
      status: 'normal',
      visible: false,
      msg: 'No message provided.'
    }
  }

  return { ...defaults, ...config }
}
export function fadeInTop(duration: number = 0.5) {
  return {
    from: {
      top: "50px",
      opacity: 0,
      transition: {
        type: 'easeInOut',
				duration: duration,
      },
    },
    to: {
      top: "0",
      opacity: 1,
      transition: {
        type: 'easeInOut',
				duration: duration,
      },
    },
  };
}

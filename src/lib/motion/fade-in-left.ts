export function fadeInLeft (duration:number = 0.4) {
  return {
    from: { 
      left: '-100%',
      transition: {
        type: 'easeInOut',
				duration: duration,
      } 
    },
    to: { 
      left: 0,
      transition: {
        type: 'easeInOut',
				duration: duration,
      } 
    },
  }
}
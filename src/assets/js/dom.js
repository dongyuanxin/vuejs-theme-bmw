let isRunning = false;

const scrollToBottom = callback => {
  if (isRunning) return;
  isRunning = true;
  window.requestAnimationFrame(timestamp => {
    let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop,
      scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight,
      clientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollTop + clientHeight + 10 >= scrollHeight) {
      callback();
      setTimeout(() => (isRunning = false), 2000);
      return;
    }
    isRunning = false;
  });
};

export { scrollToBottom };

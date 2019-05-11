export function make(send, ctrl) {

  const handlers = {
    move: ctrl.apiMove
  };

  var lastProm = Promise.resolve();

  return {
    send,
    handlers,
    receive(typ, data) {
      lastProm = lastProm.then(() => {
        if (handlers[typ]) {
          return handlers[typ](data);
        }
        return Promise.resolve();
      });
    }
  };

}

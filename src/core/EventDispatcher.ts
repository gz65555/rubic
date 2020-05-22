export class EventDispatcher {
	private listeners: { [name: string]: Function[] } = {};

	public readonly dispatch = (eventName: string, data?: any) => {
		const listeners = this.listeners[eventName];
		if (listeners) {
			listeners.forEach(callback => {
				callback(data);
			});
		}
	};

	public readonly emit = this.dispatch;

	public readonly addEventListener = (eventName: string, listener: Function) => {
		let listeners: Function[] = this.listeners[eventName];
		if (!listeners) {
			listeners = [];
			this.listeners[eventName] = listeners;
		}
		if (listeners.indexOf(listener) > -1) {
			return;
		}

		listeners.push(listener);
	};

	public readonly on = this.addEventListener;

	public readonly removeEventListener = (eventName: string, listener: Function) => {
		let listeners: Function[] = this.listeners[eventName];
		if (!listeners) {
			return;
		}
		const index = listeners.indexOf(listener);
		// 不存在 listener
		if (!(index > 0)) {
			return;
		}
		listeners.splice(index, 1);
		// 空数组时删除
		listeners.length === 0 && delete this.listeners[eventName];
  };
  
  public readonly off = this.removeEventListener;

	public readonly removeAll = (eventName?: string) => {
		if (!eventName) {
			this.listeners = {};
		} else {
			delete this.listeners[eventName];
		}
	};
}

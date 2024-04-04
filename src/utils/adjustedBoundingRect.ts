// https://stackoverflow.com/questions/27745438/how-to-compute-getboundingclientrect-without-considering-transforms

// 获取 Rect 时如何抵消 transform 带来的变化
export const adjustedBoundingRect = (el: HTMLElement): DOMRect => {
	const rect = el.getBoundingClientRect();
	const style = getComputedStyle(el);
	const tx = style.transform;

	if (tx) {
		let sx, sy, dx, dy;
		if (tx.startsWith('matrix3d(')) {
			const ta = tx.slice(9,-1).split(/, /);
			sx = +ta[0];
			sy = +ta[5];
			dx = +ta[12];
			dy = +ta[13];
		} else if (tx.startsWith('matrix(')) {
			const ta = tx.slice(7,-1).split(/, /);
			sx = +ta[0];
			sy = +ta[3];
			dx = +ta[4];
			dy = +ta[5];
		} else {
			return rect;
		}

		const to = style.transformOrigin;
		const x = rect.x - dx - (1 - sx) * parseFloat(to);
		const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1));
		const w = sx ? rect.width / sx : el.offsetWidth;
		const h = sy ? rect.height / sy : el.offsetHeight;
		return {
			x: x, y: y, width: w, height: h, top: y, right: x + w, bottom: y + h, left: x
		} as DOMRect;
	} else {
		return rect;
	}
}

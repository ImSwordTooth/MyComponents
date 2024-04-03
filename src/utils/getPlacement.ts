interface ShowLocation {
	left: string
	top: string
}

type Placement =
	| "top"
	| "bottom"
	| "right"
	| "left"
	| "top-start"
	| "top-end"
	| "bottom-start"
	| "bottom-end"
	| "left-start"
	| "left-end"
	| "right-start"
	| "right-end";

export const getPlacement = (baseElementRect: DOMRect, targetElementRect: DOMRect, placement: Placement = "bottom"): ShowLocation => {
	const { left: baseLeft, top: baseTop, width: baseWidth, height: baseHeight, bottom: baseBottom, right: baseRight} = baseElementRect
	const { left: targetLeft, top: targetTop, width: targetWidth, height: targetHeight } = targetElementRect

	console.log(baseElementRect)

	const offsetY = 8;
	const offsetX = 8;
	switch (placement) {
		case 'top': return {
			left: `${baseLeft + baseWidth/2 - targetWidth/2}px`,
			top: `${baseTop - targetHeight - offsetY}px`
		}
		case 'bottom': return {
			left: `${baseLeft + baseWidth/2 - targetWidth/2}px`,
			top: `${baseBottom + offsetY}px`
		}
		case 'right': return {
			left: `${baseRight + offsetX}px`,
			top: `${baseTop + baseHeight/2 - targetHeight/2}px`
		}
		case 'left': return {
			left: `${baseLeft - targetWidth - offsetX}px`,
			top: `${baseTop + baseHeight/2 - targetHeight/2}px`
		}
		case 'top-start': return {
			left: `${baseLeft}px`,
			top: `${baseTop - targetHeight - offsetY}px`
		}
		case 'top-end': return {
			left: `${baseRight - targetWidth}px`,
			top: `${baseTop - targetHeight - offsetY}px`
		}
		case 'bottom-start': return {
			left: `${baseLeft}px`,
			top: `${baseBottom + offsetY}px`
		}
		case 'bottom-end': return {
			left: `${baseRight - targetWidth}px`,
			top: `${baseBottom + offsetY}px`
		}
		case 'right-start': return {
			left: `${baseRight + offsetX}px`,
			top: `${baseTop}px`
		}
		case 'right-end': return {
			left: `${baseRight + offsetX}px`,
			top: `${baseTop + baseHeight - targetHeight}px`
		}
		case 'left-start': return {
			left: `${baseLeft - targetWidth - offsetX}px`,
			top: `${baseTop}px`
		}
		case 'left-end': return {
			left: `${baseLeft - targetWidth - offsetX}px`,
			top: `${baseTop + baseHeight - targetHeight}px`
		}
	}
}

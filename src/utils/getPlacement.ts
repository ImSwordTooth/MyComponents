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

export const getPlacement = (baseElementRect: DOMRect, targetElementRect: DOMRect, placement: Placement = "bottom", offset: number): ShowLocation => {
	const { left: baseLeft, top: baseTop, width: baseWidth, height: baseHeight, bottom: baseBottom, right: baseRight} = baseElementRect
	const { width: targetWidth, height: targetHeight } = targetElementRect

	switch (placement) {
		case 'top': return {
			left: `${baseLeft + baseWidth/2 - targetWidth/2}px`,
			top: `${baseTop - targetHeight - offset}px`
		}
		case 'bottom': return {
			left: `${baseLeft + baseWidth/2 - targetWidth/2}px`,
			top: `${baseBottom + offset}px`
		}
		case 'right': return {
			left: `${baseRight + offset}px`,
			top: `${baseTop + baseHeight/2 - targetHeight/2}px`
		}
		case 'left': return {
			left: `${baseLeft - targetWidth - offset}px`,
			top: `${baseTop + baseHeight/2 - targetHeight/2}px`
		}
		case 'top-start': return {
			left: `${baseLeft}px`,
			top: `${baseTop - targetHeight - offset}px`
		}
		case 'top-end': return {
			left: `${baseRight - targetWidth}px`,
			top: `${baseTop - targetHeight - offset}px`
		}
		case 'bottom-start': return {
			left: `${baseLeft}px`,
			top: `${baseBottom + offset}px`
		}
		case 'bottom-end': return {
			left: `${baseRight - targetWidth}px`,
			top: `${baseBottom + offset}px`
		}
		case 'right-start': return {
			left: `${baseRight + offset}px`,
			top: `${baseTop}px`
		}
		case 'right-end': return {
			left: `${baseRight + offset}px`,
			top: `${baseTop + baseHeight - targetHeight}px`
		}
		case 'left-start': return {
			left: `${baseLeft - targetWidth - offset}px`,
			top: `${baseTop}px`
		}
		case 'left-end': return {
			left: `${baseLeft - targetWidth - offset}px`,
			top: `${baseTop + baseHeight - targetHeight}px`
		}
	}
}

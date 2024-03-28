/**
 * hex的颜色值转换成rgba
 * @param color 16进制颜色值
 * @param opacity 颜色的透明度
 *
 * @return 返回一个rgba格式的颜色值，如果透明度为1，就不用转换
 *
 * */
export function hex2Rgba(color: string, opacity: number): string {
    if (opacity !== 100){
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // 16进制颜色值的正则
        color = color.toLowerCase(); // 把颜色值变成小写
        if (reg.test(color)) {
            if (color.length === 4) { // 如果只有三位的值，需变成六位，如：#fff => #ffffff
                let colorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                }
                color = colorNew;
            }
            let colorChange = []; // 处理六位的颜色值，转为RGB
            for (let i = 1; i < 7; i += 2) {
                colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
            }
            return `rgba(${colorChange.join(',')},${opacity/100})`;
        } else {
            return color;
        }
    } else {
        return color;
    }
}

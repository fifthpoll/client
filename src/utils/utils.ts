export function generateRandomString(length: number, seed?: string) {
  let result = "";
  const characters =
    seed ||
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function clampValue(
  value: number,
  { min, max }: { min?: number; max?: number }
) {
  let ans = value;
  if (max && min && max < min) {
    return value;
  }
  if (min && ans < min) {
    ans = min;
  }
  if (max && ans > max) {
    ans = max;
  }
  return ans;
}

export function linearMap(
  value: number,
  mapFrom: { from: number; to: number },
  mapTo: { from: number; to: number },
  clamp = true
) {
  const slope = (mapTo.to - mapTo.from) / (mapFrom.to - mapFrom.from);
  const ans = slope * (value - mapFrom.from) + mapTo.from;
  return clamp
    ? clampValue(ans, {
        min: Math.min(mapTo.from, mapTo.to),
        max: Math.max(mapTo.from, mapTo.to),
      })
    : ans;
}

export function convertColorToRGBVec(color: string): [number, number, number] {
  let rgb: [number, number, number] = [0, 0, 0];

  if (color.startsWith("#")) {
    color = color.slice(1);

    if (color.length === 3) {
      color = color
        .split("")
        .map((char) => char + char)
        .join("");
    }

    rgb = [
      parseInt(color.substr(0, 2), 16) / 255,
      parseInt(color.substr(2, 2), 16) / 255,
      parseInt(color.substr(4, 2), 16) / 255,
    ];
  } else if (color.startsWith("rgb(")) {
    const values = color
      .substring(4, color.length - 1)
      .split(",")
      .map((value) => parseInt(value.trim(), 10));

    rgb = values.map((value) => value / 255) as [number, number, number];
  }

  return rgb;
}

export function getCoords(elem: HTMLElement) {
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}

export function mapValueToColor(
  value: number,
  ranges: number[],
  colors: number[][]
) {
  value = Math.min(Math.max(value, ranges[0]), ranges[ranges.length - 1]);
  let index = 0;
  while (value > ranges[index + 1]) {
    index++;
  }

  const rangeStart = ranges[index];
  const rangeEnd = ranges[index + 1];
  const colorStart = colors[index];
  const colorEnd = colors[index + 1];

  const t = (value - rangeStart) / (rangeEnd - rangeStart);

  const r = Math.round(colorStart[0] + (colorEnd[0] - colorStart[0]) * t)
    .toString(16)
    .padStart(2, "0");
  const g = Math.round(colorStart[1] + (colorEnd[1] - colorStart[1]) * t)
    .toString(16)
    .padStart(2, "0");
  const b = Math.round(colorStart[2] + (colorEnd[2] - colorStart[2]) * t)
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
}

export function isEmail(script: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(script);
}

export function getObjectKeys<T extends object>(obj: T) {
  if (typeof obj !== "object")
    throw new Error("Not a valid object to get keys");

  return Object.keys(obj) as Array<keyof T>;
}

export function getRandomFromArray<T>(array: Array<T>): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function hasContextLoaded<T extends { loading: boolean }>(
  context: T
): context is { [K in keyof T]-?: NonNullable<T[K]> } & { loading: true } {
  return !context.loading;
}

export function getRandomLightColorArray(n: number): string[] {
  const lightColors = [
    "#FAD02E",
    "#AED581",
    "#FFCC80",
    "#B3E0FF",
    "#FFD180",
    "#D1C4E9",
    "#FFF59D",
    "#80DEEA",
    "#FFCDD2",
    "#C5CAE9",
  ];
  const result: string[] = [];

  if (n <= lightColors.length) {
    const shuffledColors = lightColors.slice().sort(() => Math.random() - 0.5);
    return shuffledColors.slice(0, n);
  }

  const remainingColors = n - lightColors.length;

  for (let i = 0; i < lightColors.length; i++) {
    result.push(lightColors[i]);
  }

  for (let i = 0; i < remainingColors; i++) {
    const randomColor = getRandomColor();
    if (!result.includes(randomColor)) {
      result.push(randomColor);
    } else {
      i--;
    }
  }

  return result;
}

export function getRandomColor(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

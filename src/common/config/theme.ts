
export const funcColors = [
    {
        label: "Primary / 主题",
        color: "colorPrimary"
    },
    {
        label: "Success / 成功",
        color: "colorSuccess"
    },
    {
        label: "Error / 错误",
        color: "colorError"
    },
    {
        label: "Warning / 警告",
        color: "colorWarning"
    },
    {
        label: "Info / 信息",
        color: "colorInfo"
    }
]

export const gray = {
    label: "Gray Color / 石墨灰",
    default: "gray",
    colors: new Array(10).fill("").map((color, index) => `gray${index+1}`)
}

export const red = {
    label: "Dust Red / 薄暮红",
    default: "red",
    colors: new Array(11).fill("").map((color, index) => `red${index+1}`)
}
export const volcano = {
    label: "Volcano / 火山棕",
    default: "volcano",
    colors: new Array(11).fill("").map((color, index) => `volcano${index+1}`)
}
export const orange = {
    label: "Sunset Orange / 日暮橙",
    default: "orange",
    colors: new Array(11).fill("").map((color, index) => `orange${index+1}`)
}

export const gold = {
    label: "Gold / 复古金",
    default: "gold",
    colors: new Array(11).fill("").map((color, index) => `gold${index+1}`)
}
export const yellow = {
    label: "Sunrise Yellow / 日出黄",
    default: "yellow",
    colors: new Array(11).fill("").map((color, index) => `yellow${index+1}`)
}
export const lime = {
    label: "Lime / 青柠色",
    default: "lime",
    colors: new Array(11).fill("").map((color, index) => `lime${index+1}`)
}

export const green = {
    label: "Polar Green / 极光绿",
    default: "green",
    colors: new Array(11).fill("").map((color, index) => `green${index+1}`)
}
export const cyan = {
    label: "Cyan / 明亮青",
    default: "cyan",
    colors: new Array(11).fill("").map((color, index) => `cyan${index+1}`)
}
export const blue = {
    label: "Daybreak Blue / 拂晓蓝",
    default: "blue",
    colors: new Array(11).fill("").map((color, index) => `blue${index+1}`)
}

export const geekblue = {
    label: "Geek Blue / 极客蓝",
    default: "geekblue",
    colors: new Array(11).fill("").map((color, index) => `geekblue${index+1}`)
}

export const purple = {
    label: "Golden Purple / 浪漫紫",
    default: "purple",
    colors: new Array(11).fill("").map((color, index) => `purple${index+1}`)
}


export const pink = {
    label: "Pink / 感性粉",
    default: "pink",
    colors: new Array(11).fill("").map((color, index) => `pink${index+1}`)
}

export const gossamer = {
    label: "Gossamer / 游丝蓝",
    default: "gossamer",
    colors: new Array(11).fill("").map((color, index) => `gossamer${index+1}`)
}


export const presetColors = [
    red,
    volcano,
    orange,
    gold,
    yellow,
    lime,
    green,
    gossamer,
    cyan,
    blue,
    geekblue,
    purple,
    pink,
    gray
]

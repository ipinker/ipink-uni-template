export type ComponentItem = {
    component: string,
    title: string,
    path: string
}
export type ComponentsItem = {
    components: ComponentItem[],
    title: string,
}
export const colorComponents: ComponentItem[] = [
    { component: "", title: "色彩", path: "/pages/components/theme/theme" }
];



const componentsCollection: ComponentsItem[] = [
    {
        title: "主题",
        components: colorComponents
    }
];

export default componentsCollection;
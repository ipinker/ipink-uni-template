
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
    { component: "", title: 'component.theme.colorful', path: "/pages/components/theme/colorful" },
];

export const basicComponents: ComponentItem[] = [
    { component: "Button", title: "component.basic.button", path: "/pages/components/basic/button" },
];


const componentsCollection: ComponentsItem[] = [
    {
        title: "component.theme.name",
        components: colorComponents
    },
    {
        title: "component.basic.name",
        components: basicComponents
    }
];

export default componentsCollection;
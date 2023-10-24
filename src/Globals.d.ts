declare module "*.css";

declare module '*.css' {
    const css: any;
    export default css;
}

declare module '*.png' {
    const image: string;
    export = image;
}
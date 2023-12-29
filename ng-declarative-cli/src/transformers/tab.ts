import { transformBase } from "./basetranformer";
export const transform = async (metadata: any, node: any, compiler: any) => {
    let baseTransformReturn: any = await transformBase(metadata, node, compiler);
    baseTransformReturn = baseTransformReturn.replace("<ng-template", `<button class="${node[metadata.tag].$["title-class"] ? node[metadata.tag].$["title-class"] : ''}" ngbNavLink>${node[metadata.tag].$.title}</button><ng-template`);
    return baseTransformReturn;
}

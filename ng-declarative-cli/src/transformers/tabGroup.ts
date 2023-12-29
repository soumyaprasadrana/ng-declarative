import { transformBase } from "./basetranformer";
export const transform = async (metadata: any, node: any, compiler: any) => {
    let baseTransformReturn: any = await transformBase(metadata, node, compiler);
    baseTransformReturn = baseTransformReturn.replace("{id}", "tabgroup" + node[metadata.tag].$.id);
    baseTransformReturn += ` <div [ngbNavOutlet]="${"tabgroup" + node[metadata.tag].$.id}" class="mt - 2"></div>`
    return baseTransformReturn;
}

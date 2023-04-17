import { ModelData, UserInputModel } from 'types';
import { IFCLoader } from 'web-ifc-three';

import { retrieveMetadata } from './metadata';
import { flattenModelTree } from './transform';
import { unindexModel } from './unindex';

export async function parse(model: UserInputModel): Promise<ModelData> {
    console.log(`Loading IFC ${model.name}`);

    const parsedData = await load(model.buffer);

    if (!parsedData) {
        throw new Error(`Failed to load model ${model.name}`);
    }

    const { geometry, metadata } = parsedData;

    return {
        geometry,
        metadata: {
            name: model.name,
            data: metadata,
            file: model.buffer,
        },
    };
}

const wasmPath = '/';

async function load(buffer: ArrayBuffer) {
    const loader = await setupLoader();
    try {
        const { metadata, flatModels } = await loadModel(loader, buffer);
        const data = unindexModel(flatModels);
        return {
            geometry: data,
            metadata,
        };
    } catch (e) {
        console.error(e);
    }
}

async function loadModel(loader: IFCLoader, buffer: ArrayBuffer) {
    const model = await loader.parse(buffer);
    const flatModels = flattenModelTree(model);
    const metadata = retrieveMetadata(flatModels);
    model.ifcManager?.close(model.modelID);
    return { metadata, flatModels };
}

async function setupLoader() {
    const loader = new IFCLoader();

    //at our own risk
    await loader.ifcManager.setWasmPath(wasmPath);
    (loader.ifcManager.state.api as any).isWasmPathAbsolute = true;
    loader.ifcManager.useWebWorkers(false);
    return loader;
}
